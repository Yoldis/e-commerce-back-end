/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderDetails` table. All the data in the column will be lost.
  - Added the required column `image` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_productId_fkey";

-- AlterTable
ALTER TABLE "OrderDetails" DROP COLUMN "productId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
