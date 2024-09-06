/*
  Warnings:

  - Added the required column `updatedAt` to the `Interactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "employeeIds" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "websiteUrl" DROP NOT NULL,
ALTER COLUMN "websiteUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "companyId" SET DEFAULT '',
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Interactions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "method" SET DEFAULT 'Unknown',
ALTER COLUMN "relatedCustomerIds" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "body" SET DEFAULT '',
ALTER COLUMN "relatedCustomerIds" SET DEFAULT ARRAY[]::TEXT[];
