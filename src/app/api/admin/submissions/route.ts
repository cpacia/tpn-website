import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = request.nextUrl.searchParams.get("status");
  const where = status && status !== "ALL" ? { status } : {};

  const submissions = await prisma.assistanceRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(submissions);
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await request.json();

  if (!id || !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
  }

  const updated = await prisma.assistanceRequest.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
