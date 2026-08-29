-- CreateTable
CREATE TABLE "ShowingRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listingId" TEXT,
    "listingSlug" TEXT NOT NULL,
    "listingTitle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "preferredTimes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ShowingRequest_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "RentalListing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
