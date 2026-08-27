import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";

export const metadata: Metadata = {
  title: "Annonces — Admin",
  robots: { index: false, follow: false },
};

export default function AdminAnnoncesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gris pt-[120px] pb-24 px-6">
      <div className="max-w-[900px] mx-auto">
        <AdminGuard>{children}</AdminGuard>
      </div>
    </div>
  );
}
