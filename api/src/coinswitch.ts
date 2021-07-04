import { Prisma, PrismaClient } from "@prisma/client";
import "dotenv/config";
import fetch from "node-fetch";
import { CleanCsResponse, CsBalance } from "./interface";

const prisma = new PrismaClient();
const ACCESS_TOKEN: string = process.env.CS_ACCESS_TOKEN as string;
const ACCT_BALANCES_URL =
  "https://cs-india.coinswitch.co/api/v1/custody-wallet-user/account-balances";

const cleanupEntry = (apiEntry: CsBalance): CleanCsResponse => {
  const coin: CleanCsResponse["coin"] = {
    name: apiEntry.coin.name,
    symbol: apiEntry.coin.symbol,
  };
  return {
    coin,
    buyPrice: new Prisma.Decimal(apiEntry.rate_inr),
    sellPrice: new Prisma.Decimal(apiEntry.sell_price),
  };
};

const getCurrentCoinPrices = async (): Promise<CleanCsResponse[]> => {
  let json: { data: CsBalance[] };
  try {
    const response = await fetch(ACCT_BALANCES_URL, {
      method: "GET",
      headers: {
        Host: "cs-india.coinswitch.co",
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        "accept-encoding": "gzip",
        "user-agent": "okhttp/3.12.1",
        "x-app-version": "2.0.1",
        "x-auth-key": ACCESS_TOKEN,
        "if-modified-since": new Date().toUTCString(),
      },
    });
    json = await response.json();
  } catch (err) {
    return [];
  }
  const { data } = json;
  return data.map(cleanupEntry);
};

const dataCollector = async () => {
  prisma.$connect();
  const time = new Date();
  const items = await getCurrentCoinPrices();
  const coins = await prisma.coin.findMany();
  for (const item of items) {
    const coin =
      coins.find((c) => c.symbol === item.coin.symbol) ||
      (await prisma.coin.create({ data: item.coin }));
    await prisma.history.create({
      data: {
        time,
        symbol: coin.symbol,
        buyPrice: item.buyPrice,
        sellPrice: item.sellPrice,
      },
    });
  }
  prisma.$disconnect();
};

const loop = async () => {
  const interval = 5 * 60 * 1000; // 5 minutes
  setInterval(dataCollector, interval);
};

export default loop;
