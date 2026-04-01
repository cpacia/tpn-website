import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/AdminSidebar";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  const user = await prisma.adminUser.findUnique({
    where: { id: session.userId },
    select: { username: true },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar username={user?.username || "Admin"} />
      <main className="flex-1 p-8 lg:p-12">{children}</main>
    </div>
  );
}
