/*
  Warnings:

  - You are about to drop the `_ImageToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ImageToProduct" DROP CONSTRAINT "_ImageToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProduct" DROP CONSTRAINT "_ImageToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_ImageToProduct";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
