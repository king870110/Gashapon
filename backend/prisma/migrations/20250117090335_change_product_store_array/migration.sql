/*
  Warnings:

  - You are about to drop the column `store_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_store_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "store_id";

-- CreateTable
CREATE TABLE "_ProductToStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductToStore_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductToStore_B_index" ON "_ProductToStore"("B");

-- AddForeignKey
ALTER TABLE "_ProductToStore" ADD CONSTRAINT "_ProductToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToStore" ADD CONSTRAINT "_ProductToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
