/*
  Warnings:

  - The values [VAZIO,MAIS_VENDIDO,RECOMENDADO,NOVO] on the enum `Tags` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ipva` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Tags_new" AS ENUM ('EMPTY', 'USED', 'NEW');
ALTER TABLE "Vehicle" ALTER COLUMN "specialTag" DROP DEFAULT;
ALTER TABLE "Vehicle" ALTER COLUMN "specialTag" TYPE "Tags_new" USING ("specialTag"::text::"Tags_new");
ALTER TYPE "Tags" RENAME TO "Tags_old";
ALTER TYPE "Tags_new" RENAME TO "Tags";
DROP TYPE "Tags_old";
ALTER TABLE "Vehicle" ALTER COLUMN "specialTag" SET DEFAULT 'EMPTY';
COMMIT;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "ipva",
ALTER COLUMN "specialTag" SET DEFAULT 'EMPTY',
ALTER COLUMN "whatsApp" SET DEFAULT '89 9 94176493';
