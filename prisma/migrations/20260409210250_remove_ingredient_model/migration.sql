/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuItemIngredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MenuItemIngredients" DROP CONSTRAINT "_MenuItemIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemIngredients" DROP CONSTRAINT "_MenuItemIngredients_B_fkey";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "_MenuItemIngredients";
