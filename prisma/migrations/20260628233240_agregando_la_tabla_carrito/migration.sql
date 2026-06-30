-- CreateTable
CREATE TABLE "ShoopingCart" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "size" "Sizes" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" INTEGER NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ShoopingCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoopingCart" ADD CONSTRAINT "ShoopingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
