import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function recordCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripe = getStripe();
  const amountTotal = session.amount_total ?? 0;
  const amount = amountTotal / 100;
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  const customerName = session.customer_details?.name ?? null;
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : (session.customer?.id ?? null);
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : (session.subscription?.id ?? null);
  const metadata = session.metadata ?? {};
  const publicRequestId = metadata.publicRequestId || null;

  const existing = await prisma.donation.findUnique({
    where: { stripeSessionId: session.id },
  });

  await prisma.donation.upsert({
    where: { stripeSessionId: session.id },
    update: {
      status: "succeeded",
      amount: amount || existing?.amount || 0,
      donorEmail: customerEmail,
      donorName: customerName,
      stripeCustomerId: customerId,
      stripePaymentIntentId: paymentIntentId,
      stripeSubscriptionId: subscriptionId,
    },
    create: {
      amount,
      currency: session.currency ?? "usd",
      frequency: metadata.frequency === "monthly" ? "monthly" : "one-time",
      category: metadata.category ?? null,
      status: "succeeded",
      donorEmail: customerEmail,
      donorName: customerName,
      stripeSessionId: session.id,
      stripeCustomerId: customerId,
      stripePaymentIntentId: paymentIntentId,
      stripeSubscriptionId: subscriptionId,
      publicRequestId,
    },
  });

  const alreadyCounted = existing?.status === "succeeded";
  if (publicRequestId && !alreadyCounted && amount > 0) {
    await prisma.$transaction(async (tx) => {
      const req = await tx.publicRequest.findUnique({
        where: { id: publicRequestId },
        select: { fundedAmount: true, requestedAmount: true },
      });
      if (!req) return;
      const newFunded = req.fundedAmount + amount;
      await tx.publicRequest.update({
        where: { id: publicRequestId },
        data: {
          fundedAmount: newFunded,
          fullyFunded: newFunded >= req.requestedAmount,
        },
      });
    });
  }

  // Stripe Checkout doesn't always include subscription metadata on the session
  // immediately; mirror metadata to the subscription so renewals carry it.
  if (subscriptionId && Object.keys(metadata).length > 0) {
    try {
      await stripe.subscriptions.update(subscriptionId, { metadata });
    } catch (err) {
      console.error("Failed to mirror metadata to subscription:", err);
    }
  }
}

async function recordRecurringPayment(invoice: Stripe.Invoice) {
  const subscriptionId =
    typeof (invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }).subscription === "string"
      ? ((invoice as Stripe.Invoice & { subscription?: string }).subscription as string)
      : (invoice as Stripe.Invoice & { subscription?: Stripe.Subscription }).subscription?.id ?? null;
  if (!subscriptionId) return;
  if (invoice.billing_reason !== "subscription_cycle") return;

  const stripe = getStripe();
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  const metadata = sub.metadata ?? {};
  const amount = (invoice.amount_paid ?? 0) / 100;
  if (amount <= 0) return;

  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : (invoice.customer?.id ?? null);
  const customerEmail = invoice.customer_email ?? null;
  const customerName = invoice.customer_name ?? null;
  const paymentIntentId =
    typeof (invoice as Stripe.Invoice & { payment_intent?: string | Stripe.PaymentIntent }).payment_intent === "string"
      ? ((invoice as Stripe.Invoice & { payment_intent?: string }).payment_intent as string)
      : (invoice as Stripe.Invoice & { payment_intent?: Stripe.PaymentIntent }).payment_intent?.id ?? null;

  if (paymentIntentId) {
    const dupe = await prisma.donation.findUnique({
      where: { stripePaymentIntentId: paymentIntentId },
    });
    if (dupe) return;
  }

  await prisma.donation.create({
    data: {
      amount,
      currency: invoice.currency ?? "usd",
      frequency: "monthly",
      category: metadata.category ?? null,
      status: "succeeded",
      donorEmail: customerEmail,
      donorName: customerName,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      stripePaymentIntentId: paymentIntentId,
    },
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook misconfigured" },
      { status: 400 }
    );
  }

  const body = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await recordCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "invoice.payment_succeeded":
        await recordRecurringPayment(event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(`Failed handling ${event.type}:`, err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
