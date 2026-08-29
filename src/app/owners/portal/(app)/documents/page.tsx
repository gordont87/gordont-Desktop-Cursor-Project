import { requireOwner } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = { title: "Documents" };

export default async function DocumentsPage() {
  const auth = await requireOwner();
  if (!auth) redirect("/owners/portal/login");

  const documents = await prisma.document.findMany({
    where: { ownerId: auth.owner.id },
    include: { property: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Documents</h1>
        <p className="mt-2 text-sm text-slate">
          Leases, agreements, and insurance records. File downloads require cloud storage configuration.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted">
            <tr className="text-left text-slate">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Property</th>
              <th className="px-5 py-3 font-medium">Added</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium text-navy">{d.name}</td>
                <td className="px-5 py-3">{d.category}</td>
                <td className="px-5 py-3 text-slate">{d.property?.name ?? "Account"}</td>
                <td className="px-5 py-3 text-slate">{d.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate">
        Demo records only — connect S3/Cloudinary (or your PMS document store) before offering downloads.
      </p>
    </div>
  );
}
