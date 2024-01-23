-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Owner', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('None', 'One', 'Two', 'Three', 'Four', 'Five');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('FailedToPay', 'Paying', 'Paid');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" TEXT NOT NULL,
    "forUser" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT,
    "age" TEXT,
    "phoneNumber" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "CategoryId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" "Rating" NOT NULL DEFAULT 'None',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "byUser" TEXT NOT NULL,
    "onProduct" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cartId" TEXT NOT NULL,
    "forUser" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "ProductToCart" (
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ProductToCart_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'Paying',
    "totalPrice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "byUser" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "ProductToOrder" (
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "ProductToOrder_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateTable
CREATE TABLE "Token" (
    "tokenId" TEXT NOT NULL,
    "forUser" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "loggedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("tokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_forUser_key" ON "Profile"("forUser");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_forUser_key" ON "Cart"("forUser");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_forUser_fkey" FOREIGN KEY ("forUser") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_byUser_fkey" FOREIGN KEY ("byUser") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_onProduct_fkey" FOREIGN KEY ("onProduct") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_forUser_fkey" FOREIGN KEY ("forUser") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToCart" ADD CONSTRAINT "ProductToCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("cartId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToCart" ADD CONSTRAINT "ProductToCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_byUser_fkey" FOREIGN KEY ("byUser") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToOrder" ADD CONSTRAINT "ProductToOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_forUser_fkey" FOREIGN KEY ("forUser") REFERENCES "User"("userName") ON DELETE CASCADE ON UPDATE CASCADE;
