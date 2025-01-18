/*
  Warnings:

  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
