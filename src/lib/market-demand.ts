import type { DemandSignals } from "@/lib/data/market-reports";
import { prisma } from "@/lib/db";

export async function getDemandSignals(): Promise<DemandSignals> {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [showingsLast30Days, showingsNew, analysisLeadsLast30Days, analysisLeadsNew] =
    await Promise.all([
      prisma.showingRequest.count({ where: { createdAt: { gte: since } } }),
      prisma.showingRequest.count({ where: { status: "New" } }),
      prisma.analysisLead.count({ where: { createdAt: { gte: since } } }),
      prisma.analysisLead.count({ where: { status: "New" } }),
    ]);

  return {
    showingsLast30Days,
    showingsNew,
    analysisLeadsLast30Days,
    analysisLeadsNew,
  };
}
