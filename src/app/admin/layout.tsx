import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TPN Admin",
  description: "Texas Philanthropy Network Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
