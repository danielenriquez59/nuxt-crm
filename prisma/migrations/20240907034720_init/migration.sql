/*
  Warnings:

  - You are about to drop the column `relatedCustomerIds` on the `Interactions` table. All the data in the column will be lost.
  - You are about to drop the column `relatedCustomerIds` on the `Notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interactions" DROP COLUMN "relatedCustomerIds";

-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "relatedCustomerIds";

-- CreateTable
CREATE TABLE "_CustomersToNotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomersToInteractions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomersToNotes_AB_unique" ON "_CustomersToNotes"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomersToNotes_B_index" ON "_CustomersToNotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomersToInteractions_AB_unique" ON "_CustomersToInteractions"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomersToInteractions_B_index" ON "_CustomersToInteractions"("B");

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomersToNotes" ADD CONSTRAINT "_CustomersToNotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomersToNotes" ADD CONSTRAINT "_CustomersToNotes_B_fkey" FOREIGN KEY ("B") REFERENCES "Notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomersToInteractions" ADD CONSTRAINT "_CustomersToInteractions_A_fkey" FOREIGN KEY ("A") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomersToInteractions" ADD CONSTRAINT "_CustomersToInteractions_B_fkey" FOREIGN KEY ("B") REFERENCES "Interactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
