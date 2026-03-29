/*
  Warnings:

  - You are about to alter the column `price` on the `MenuItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `discount` on the `MenuItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "shortCode" TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "servings" SET DEFAULT 1,
ALTER COLUMN "spicey" SET DEFAULT 'NO';

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "symbol" TEXT;
