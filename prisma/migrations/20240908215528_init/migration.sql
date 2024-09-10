/*
  Warnings:

  - You are about to drop the `Interactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CustomersToInteractions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomersToInteractions" DROP CONSTRAINT "_CustomersToInteractions_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomersToInteractions" DROP CONSTRAINT "_CustomersToInteractions_B_fkey";

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "contact_method" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Interactions";

-- DropTable
DROP TABLE "_CustomersToInteractions";
