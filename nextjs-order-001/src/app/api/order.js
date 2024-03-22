"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ORDER = prisma.tbl_orders;

export const selectAll = async () => {
  const result = await ORDER.findMany();
  return result;
};
