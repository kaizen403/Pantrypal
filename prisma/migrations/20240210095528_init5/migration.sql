-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "itemname" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sellstart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
