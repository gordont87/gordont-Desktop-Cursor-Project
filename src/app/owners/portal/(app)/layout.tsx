import { requireOwner } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";

export const dynamic = "force-dynamic";

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireOwner();
  if (!auth) {
    redirect("/owners/portal/login");
  }

  return <PortalShell ownerName={auth.owner.name}>{children}</PortalShell>;
}
