import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export const getHistoryCount = async () => await prisma.history.count();

export const getCoinCount = async () => await prisma.coin.count();
