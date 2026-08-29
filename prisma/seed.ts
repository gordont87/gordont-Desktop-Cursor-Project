import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import { seedListings } from "../src/lib/data/listings";

const connectionString = process.env.DATABASE_URL;
if (!connectionString || connectionString.startsWith("file:")) {
  throw new Error(
    "Set DATABASE_URL to a PostgreSQL connection string before seeding (see .env.example).",
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.rentPayment.deleteMany();
  await prisma.tenantDocument.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.document.deleteMany();
  await prisma.statement.deleteMany();
  await prisma.showingRequest.deleteMany();
  await prisma.analysisLead.deleteMany();
  await prisma.rentalListing.deleteMany();
  await prisma.property.deleteMany();
  await prisma.owner.deleteMany();

  const ownerHash = await bcrypt.hash("OwnerDemo123!", 10);
  const tenantHash = await bcrypt.hash("TenantDemo123!", 10);

  const owner = await prisma.owner.create({
    data: {
      email: "owner@tandtgordon.example",
      passwordHash: ownerHash,
      name: "Jordan Gordon",
      phone: "(555) 010-2400",
    },
  });

  const oak = await prisma.property.create({
    data: {
      ownerId: owner.id,
      name: "Vestavia Craftsman",
      address: "2148 Willow Creek Dr",
      city: "Birmingham",
      state: "AL",
      zip: "35216",
      type: "Single Family",
      beds: 3,
      baths: 2,
      sqft: 1680,
      status: "Occupied",
      imageUrl:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const lake = await prisma.property.create({
    data: {
      ownerId: owner.id,
      name: "Jones Valley Townhome",
      address: "88 Harbor Lane",
      city: "Huntsville",
      state: "AL",
      zip: "35802",
      type: "Townhome",
      beds: 2,
      baths: 2.5,
      sqft: 1320,
      status: "Occupied",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const vacant = await prisma.property.create({
    data: {
      ownerId: owner.id,
      name: "Midtown Mobile Condo",
      address: "401 Vista Ridge #12",
      city: "Mobile",
      state: "AL",
      zip: "36604",
      type: "Condo",
      beds: 1,
      baths: 1,
      sqft: 820,
      status: "Vacant",
      imageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const now = new Date();
  const monthsAgo = (m: number) => new Date(now.getFullYear(), now.getMonth() - m, 1);

  const oakLease = await prisma.lease.create({
    data: {
      propertyId: oak.id,
      tenantLabel: "Alex Rivera",
      monthlyRent: 2850,
      startDate: monthsAgo(10),
      endDate: new Date(now.getFullYear() + 1, now.getMonth(), 1),
      status: "Active",
    },
  });

  await prisma.lease.create({
    data: {
      propertyId: lake.id,
      tenantLabel: "Tenant B",
      monthlyRent: 2195,
      startDate: monthsAgo(4),
      endDate: new Date(now.getFullYear(), now.getMonth() + 8, 1),
      status: "Active",
    },
  });

  const tenant = await prisma.tenant.create({
    data: {
      email: "tenant@tandtgordon.example",
      passwordHash: tenantHash,
      name: "Alex Rivera",
      phone: "(555) 010-8899",
      leaseId: oakLease.id,
    },
  });

  const txns = [];
  for (let m = 0; m < 6; m++) {
    const d = monthsAgo(m);
    const label = d.toLocaleString("en-US", { month: "short", year: "numeric" });
    txns.push(
      {
        propertyId: oak.id,
        date: d,
        type: "income",
        category: "Rent",
        amount: 2850,
        description: `Rent collected — ${label}`,
      },
      {
        propertyId: lake.id,
        date: d,
        type: "income",
        category: "Rent",
        amount: 2195,
        description: `Rent collected — ${label}`,
      },
      {
        propertyId: oak.id,
        date: new Date(d.getFullYear(), d.getMonth(), 12),
        type: "expense",
        category: "Management Fee",
        amount: 228,
        description: "Management fee (8%)",
      },
      {
        propertyId: lake.id,
        date: new Date(d.getFullYear(), d.getMonth(), 12),
        type: "expense",
        category: "Management Fee",
        amount: 175.6,
        description: "Management fee (8%)",
      },
    );
  }

  txns.push(
    {
      propertyId: oak.id,
      date: monthsAgo(1),
      type: "expense",
      category: "Maintenance",
      amount: 185,
      description: "HVAC filter + tune-up",
    },
    {
      propertyId: lake.id,
      date: monthsAgo(2),
      type: "expense",
      category: "Repairs",
      amount: 420,
      description: "Garbage disposal replacement",
    },
    {
      propertyId: vacant.id,
      date: monthsAgo(0),
      type: "expense",
      category: "Marketing",
      amount: 95,
      description: "Listing photography + syndication",
    },
  );

  await prisma.transaction.createMany({ data: txns });

  // Rent payment history for demo tenant
  for (let m = 1; m <= 3; m++) {
    const due = new Date(now.getFullYear(), now.getMonth() - m, 1);
    await prisma.rentPayment.create({
      data: {
        tenantId: tenant.id,
        leaseId: oakLease.id,
        amount: 2850,
        dueDate: due,
        status: "Paid",
        method: "Bank transfer (demo)",
        paidAt: new Date(due.getFullYear(), due.getMonth(), 2),
        note: "Demo payment record",
      },
    });
  }

  // Current month due
  await prisma.rentPayment.create({
    data: {
      tenantId: tenant.id,
      leaseId: oakLease.id,
      amount: 2850,
      dueDate: new Date(now.getFullYear(), now.getMonth(), 1),
      status: "Due",
      note: "Current month rent",
    },
  });

  await prisma.maintenanceRequest.createMany({
    data: [
      {
        propertyId: oak.id,
        tenantId: tenant.id,
        title: "Kitchen faucet drip",
        description: "Slow drip under kitchen sink when cold water is on.",
        category: "Plumbing",
        urgency: "Normal",
        status: "In Progress",
      },
      {
        propertyId: lake.id,
        title: "Garage door remote",
        description: "Remote battery replaced; door opener still intermittent.",
        category: "Other",
        urgency: "Normal",
        status: "Open",
      },
      {
        propertyId: oak.id,
        tenantId: tenant.id,
        title: "AC not cooling upstairs",
        description: "Resolved — capacitor replaced.",
        category: "HVAC",
        urgency: "Urgent",
        status: "Closed",
      },
    ],
  });

  await prisma.inspection.createMany({
    data: [
      {
        propertyId: oak.id,
        date: monthsAgo(1),
        type: "Routine",
        summary: "Property in good condition. Minor caulk touch-up recommended in master bath.",
        score: "Good",
      },
      {
        propertyId: lake.id,
        date: monthsAgo(3),
        type: "Move-In",
        summary: "Move-in inspection complete. All systems operational.",
        score: "Excellent",
      },
      {
        propertyId: vacant.id,
        date: monthsAgo(0),
        type: "Make-Ready",
        summary: "Turnover walkthrough — paint touch-ups scheduled before showings.",
        score: "Fair",
      },
    ],
  });

  await prisma.document.createMany({
    data: [
      {
        ownerId: owner.id,
        propertyId: oak.id,
        name: "Active Lease — Oak Ridge",
        category: "Lease",
        note: "Demo document record — file storage not connected.",
      },
      {
        ownerId: owner.id,
        propertyId: lake.id,
        name: "Active Lease — Lakeview",
        category: "Lease",
        note: "Demo document record — file storage not connected.",
      },
      {
        ownerId: owner.id,
        name: "Owner Management Agreement",
        category: "Agreement",
        note: "Demo document record.",
      },
      {
        ownerId: owner.id,
        propertyId: oak.id,
        name: "Insurance Declaration — Oak Ridge",
        category: "Insurance",
        note: "Demo document record.",
      },
    ],
  });

  await prisma.tenantDocument.createMany({
    data: [
      {
        tenantId: tenant.id,
        name: "Signed Lease Agreement",
        category: "Lease",
        note: "Demo document — file download requires storage setup.",
      },
      {
        tenantId: tenant.id,
        name: "Move-In Checklist",
        category: "Move-In",
        note: "Demo document.",
      },
      {
        tenantId: tenant.id,
        name: "Community Rules & Policies",
        category: "Policies",
        note: "Demo document.",
      },
    ],
  });

  for (let m = 1; m <= 3; m++) {
    const start = monthsAgo(m);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    const income = 2850 + 2195;
    const expenses = 228 + 175.6 + (m === 1 ? 185 : m === 2 ? 420 : 0);
    await prisma.statement.create({
      data: {
        ownerId: owner.id,
        periodLabel: start.toLocaleString("en-US", { month: "long", year: "numeric" }),
        periodStart: start,
        periodEnd: end,
        totalIncome: income,
        totalExpenses: expenses,
        distribution: income - expenses,
      },
    });
  }

  for (const listing of seedListings) {
    await prisma.rentalListing.create({
      data: {
        ownerId: owner.id,
        slug: listing.slug,
        title: listing.title,
        address: listing.address,
        city: listing.city,
        state: listing.state,
        zip: listing.zip,
        rent: listing.rent,
        beds: listing.beds,
        baths: listing.baths,
        sqft: listing.sqft,
        type: listing.type,
        pets: listing.pets,
        garage: listing.garage,
        pool: listing.pool,
        available: listing.available,
        amenitiesJson: JSON.stringify(listing.amenities),
        imageUrl: listing.image,
        lat: listing.lat ?? null,
        lng: listing.lng ?? null,
        status: "Available",
      },
    });
  }

  console.log("Seeded owner + tenant portal + rental listings");
  console.log("Owner:  owner@tandtgordon.example / OwnerDemo123!");
  console.log("Tenant: tenant@tandtgordon.example / TenantDemo123!");
  console.log(`Listings: ${seedListings.length} available rentals`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
