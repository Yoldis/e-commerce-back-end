/*
  Warnings:

  - You are about to drop the column `product` on the `OrderDetails` table. All the data in the column will be lost.
  - Added the required column `productId` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetails" DROP COLUMN "product",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
