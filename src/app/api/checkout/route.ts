import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const MIN_DONATION_CENTS = 100;
const MAX_DONATION_CENTS = 1_000_000_00;

type Body = {
  amount?: number;
  frequency?: "one-time" | "monthly";
  category?: string;
  publicRequestId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const frequency = body.frequency === "monthly" ? "monthly" : "one-time";
    const amountCents = Math.round(Number(body.amount) * 100);

    if (!Number.isFinite(amountCents) || amountCents < MIN_DONATION_CENTS) {
      return NextResponse.json(
        { error: "Minimum donation is $1" },
        { status: 400 }
      );
    }
    if (amountCents > MAX_DONATION_CENTS) {
      return NextResponse.json(
        { error: "Amount exceeds maximum" },
        { status: 400 }
      );
    }

    let publicRequest = null;
    if (body.publicRequestId) {
      publicRequest = await prisma.publicRequest.findUnique({
        where: { id: body.publicRequestId },
        select: { id: true, title: true, fullyFunded: true },
      });
      if (!publicRequest) {
        return NextResponse.json(
          { error: "Request not found" },
          { status: 404 }
        );
      }
      if (publicRequest.fullyFunded) {
        return NextResponse.json(
          { error: "This request is already fully funded" },
          { status: 400 }
        );
      }
      if (frequency === "monthly") {
        return NextResponse.json(
          { error: "Request donations must be one-time" },
          { status: 400 }
        );
      }
    }

    const origin =
      request.headers.get("origin") ??
      `https://${request.headers.get("host") ?? "localhost:3000"}`;

    const productName = publicRequest
      ? `Donation: ${publicRequest.title}`
      : body.category
        ? `Donation: ${body.category}`
        : "Donation to Texas Philanthropy Network";

    const metadata: Record<string, string> = {
      frequency,
    };
    if (body.category) metadata.category = body.category;
    if (publicRequest) metadata.publicRequestId = publicRequest.id;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: { name: productName },
            ...(frequency === "monthly"
              ? { recurring: { interval: "month" } }
              : {}),
          },
        },
      ],
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?canceled=1`,
      metadata,
      ...(frequency === "monthly"
        ? { subscription_data: { metadata } }
        : { payment_intent_data: { metadata } }),
    });

    await prisma.donation.create({
      data: {
        amount: amountCents / 100,
        currency: "usd",
        frequency,
        category: body.category ?? null,
        status: "pending",
        stripeSessionId: session.id,
        publicRequestId: publicRequest?.id ?? null,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
