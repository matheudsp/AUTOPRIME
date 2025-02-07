/*
  Warnings:

  - The values [EMPTY,PICANTE,LIMITADO,VEGANO,SEM_GLUTEN,ORGANICO,SAUDAVEL,FIT,ARTESANAL,GOURMET,VEGETARIANO] on the enum `Tags` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `armored` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gas` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipva` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `km` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Tags_new" AS ENUM ('VAZIO', 'MAIS_VENDIDO', 'RECOMENDADO', 'NOVO');
ALTER TABLE "Vehicle" ALTER COLUMN "specialTag" DROP DEFAULT;
ALTER TABLE "Vehicle" ALTER COLUMN "specialTag" TYPE "Tags_new" USING ("specialTag"::text::"Tags_new");
ALTER TYPE "Tags" RENAME TO "Tags_old";
ALTER TYPE "Tags_new" RENAME TO "Tags";
DROP TYPE "Tags_old";
ALTER TABLE "Vehicle" ALTER COLUMN "specialTag" SET DEFAULT 'VAZIO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "armored" TEXT NOT NULL,
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "gas" TEXT NOT NULL,
ADD COLUMN     "ipva" TEXT NOT NULL,
ADD COLUMN     "km" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "plateEnd" INTEGER,
ADD COLUMN     "transmission" TEXT NOT NULL,
ADD COLUMN     "version" TEXT NOT NULL,
ADD COLUMN     "whatsApp" TEXT,
ADD COLUMN     "year" TEXT NOT NULL,
ALTER COLUMN "specialTag" SET DEFAULT 'VAZIO',
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "discountPercentage" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
