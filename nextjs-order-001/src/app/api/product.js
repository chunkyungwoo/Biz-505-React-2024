"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const selectAll = async ({ c_code }) => {
  const result = await prisma.tbl_customer.findMany({
    where: { c_code },
  });
  return result;
};
