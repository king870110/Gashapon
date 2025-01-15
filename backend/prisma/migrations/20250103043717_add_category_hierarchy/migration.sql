-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_image_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "store_id" DROP NOT NULL,
ALTER COLUMN "image_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
