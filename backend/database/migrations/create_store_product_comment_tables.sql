-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL PRIMARY KEY,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image_url" VARCHAR NOT NULL,
    "description" TEXT,
    "store_id" INTEGER NOT NULL,
    FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL PRIMARY KEY,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE
);

-- CreateIndex
CREATE INDEX "products_store_id_idx" ON "products"("store_id");
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");
CREATE INDEX "comments_store_id_idx" ON "comments"("store_id"); 