import { AdminShell } from "@/components/admin/admin-shell";
import { PagesList } from "@/components/page-builder/pages-list";

export default function AdminPagesPage() {
  return (
    <AdminShell>
      <PagesList />
    </AdminShell>
  );
}
