import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const donations = await prisma.transparencyDonation.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(donations);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  if (!data.description || !data.category) {
    return NextResponse.json({ error: "Description and category are required" }, { status: 400 });
  }

  const maxOrder = await prisma.transparencyDonation.aggregate({ _max: { sortOrder: true } });
  const donation = await prisma.transparencyDonation.create({
    data: {
      description: data.description,
      amount: data.amount ? parseFloat(data.amount) : null,
      category: data.category,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  return NextResponse.json(donation, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const updateData: Record<string, unknown> = {};
  if (data.description !== undefined) updateData.description = data.description;
  if (data.amount !== undefined) updateData.amount = data.amount ? parseFloat(data.amount) : null;
  if (data.category !== undefined) updateData.category = data.category;

  const updated = await prisma.transparencyDonation.update({
    where: { id: data.id },
    data: updateData,
  });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  await prisma.transparencyDonation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
