"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCT = prisma.tbl_product;

const CUSTOMER = prisma.tbl_customer;

export const selectAll = async () => {
  const result = await PRODUCT.findMany();
  return result;
};
