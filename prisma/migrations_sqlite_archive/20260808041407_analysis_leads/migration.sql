-- CreateTable
CREATE TABLE "AnalysisLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL DEFAULT 'website',
    "address" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "beds" TEXT NOT NULL,
    "baths" TEXT NOT NULL,
    "sqft" INTEGER,
    "currentRent" REAL,
    "estimateLow" INTEGER,
    "estimateHigh" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'New',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
