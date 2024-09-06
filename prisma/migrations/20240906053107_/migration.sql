/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Interaction";

-- DropTable
DROP TABLE "Note";

-- CreateTable
CREATE TABLE "Companies" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL,
    "employeeIds" TEXT[],
    "isEvaluation" BOOLEAN NOT NULL DEFAULT false,
    "websiteUrl" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interactions" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "relatedCustomerIds" TEXT[],

    CONSTRAINT "Interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "relatedCustomerIds" TEXT[],

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
