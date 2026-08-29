-- CreateTable
CREATE TABLE "RentalListing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "rent" REAL NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" REAL NOT NULL,
    "sqft" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "pets" TEXT NOT NULL,
    "garage" BOOLEAN NOT NULL DEFAULT false,
    "pool" BOOLEAN NOT NULL DEFAULT false,
    "available" TEXT NOT NULL,
    "amenitiesJson" TEXT NOT NULL DEFAULT '[]',
    "imageUrl" TEXT NOT NULL,
    "virtualTourUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Available',
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RentalListing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RentalListing_slug_key" ON "RentalListing"("slug");
