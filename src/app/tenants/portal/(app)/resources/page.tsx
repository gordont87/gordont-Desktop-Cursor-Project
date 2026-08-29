import { requireTenant } from "@/lib/tenant-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Resources" };

const links = [
  { href: "/tenants/move-in-out", label: "Move-in / move-out checklists" },
  { href: "/tenants/faqs", label: "Tenant FAQs" },
  { href: "/tenants/resources", label: "Resident resources" },
  { href: "/contact", label: "Contact the office" },
];

export default async function TenantResourcesPage() {
  const auth = await requireTenant();
  if (!auth) redirect("/tenants/portal/login");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Resources</h1>
        <p className="mt-2 text-sm text-slate">Helpful links for your tenancy.</p>
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="card-surface block px-5 py-4 font-medium text-navy hover:border-champagne"
            >
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
