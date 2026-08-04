-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "totalDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "typeDiscount" "OffertType";
