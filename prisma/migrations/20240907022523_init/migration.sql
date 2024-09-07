/*
  Warnings:

  - The primary key for the `Customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Interactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customers_id_seq";

-- AlterTable
ALTER TABLE "Interactions" DROP CONSTRAINT "Interactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Interactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Interactions_id_seq";

-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notes_id_seq";
