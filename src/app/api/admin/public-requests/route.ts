import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const requests = await prisma.publicRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();

  if (!data.title || !data.description || data.requestedAmount == null) {
    return NextResponse.json({ error: "Title, description, and requested amount are required" }, { status: 400 });
  }

  const publicRequest = await prisma.publicRequest.create({
    data: {
      title: data.title,
      description: data.description,
      requestedAmount: parseFloat(data.requestedAmount),
      fundedAmount: data.fundedAmount ? parseFloat(data.fundedAmount) : 0,
      fullyFunded: data.fullyFunded || false,
      date: data.date ? new Date(data.date) : null,
      imageUrl: data.imageUrl || null,
    },
  });

  return NextResponse.json(publicRequest, { status: 201 });
}
