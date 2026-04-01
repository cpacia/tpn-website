import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await request.json();

  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.requestedAmount !== undefined) updateData.requestedAmount = parseFloat(data.requestedAmount);
  if (data.fundedAmount !== undefined) updateData.fundedAmount = parseFloat(data.fundedAmount);
  if (data.fullyFunded !== undefined) updateData.fullyFunded = data.fullyFunded;
  if (data.date !== undefined) updateData.date = data.date ? new Date(data.date) : null;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl || null;

  const updated = await prisma.publicRequest.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await prisma.publicRequest.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
