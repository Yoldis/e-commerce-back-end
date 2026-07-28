/*
  Warnings:

  - You are about to drop the column `product` on the `ShoopingCart` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ShoopingCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `ShoopingCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShoopingCart" DROP CONSTRAINT "ShoopingCart_userId_fkey";

-- AlterTable
ALTER TABLE "ShoopingCart" DROP COLUMN "product",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ShoopingCart" ADD CONSTRAINT "ShoopingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoopingCart" ADD CONSTRAINT "ShoopingCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
