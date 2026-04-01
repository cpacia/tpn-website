import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const expenses = await prisma.transparencyExpense.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  if (!data.description || data.amount == null) {
    return NextResponse.json({ error: "Description and amount are required" }, { status: 400 });
  }

  const maxOrder = await prisma.transparencyExpense.aggregate({ _max: { sortOrder: true } });
  const expense = await prisma.transparencyExpense.create({
    data: {
      description: data.description,
      amount: parseFloat(data.amount),
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  return NextResponse.json(expense, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const updateData: Record<string, unknown> = {};
  if (data.description !== undefined) updateData.description = data.description;
  if (data.amount !== undefined) updateData.amount = parseFloat(data.amount);

  const updated = await prisma.transparencyExpense.update({
    where: { id: data.id },
    data: updateData,
  });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  await prisma.transparencyExpense.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
