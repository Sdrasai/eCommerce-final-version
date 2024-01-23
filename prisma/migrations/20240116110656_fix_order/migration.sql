/*
  Warnings:

  - You are about to drop the `ProductToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderProducts` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `totalPrice` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProductToOrder" DROP CONSTRAINT "ProductToOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductToOrder" DROP CONSTRAINT "ProductToOrder_productId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderProducts" JSONB NOT NULL,
DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductToOrder";
