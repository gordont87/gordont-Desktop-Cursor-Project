import { requireTenant } from "@/lib/tenant-auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Documents" };

export default async function TenantDocumentsPage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  const documents = await prisma.tenantDocument.findMany({
    where: { tenantId: auth.tenant.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Documents</h1>
        <p className="mt-2 text-sm text-slate">
          Lease and resident documents on file. Downloads require file storage configuration.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted">
            <tr className="text-left text-slate">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Added</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium text-navy">{d.name}</td>
                <td className="px-5 py-3">{d.category}</td>
                <td className="px-5 py-3 text-slate">{d.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
