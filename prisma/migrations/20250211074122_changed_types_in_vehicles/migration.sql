/*
  Warnings:

  - You are about to alter the column `basePrice` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `DoublePrecision`.
  - The `armored` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plateEnd` column on the `Vehicle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "basePrice" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "armored",
ADD COLUMN     "armored" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "plateEnd",
ADD COLUMN     "plateEnd" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
