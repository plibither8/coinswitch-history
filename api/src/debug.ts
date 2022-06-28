import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHistoryCount = async () => await prisma.history.count();

export const getCoinCount = async () => await prisma.coin.count();

export const reset = async () => {
  await prisma.history.deleteMany();
  await prisma.coin.deleteMany();
};
