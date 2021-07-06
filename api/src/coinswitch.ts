import "dotenv/config";
import { Prisma, PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { createWriteStream, existsSync } from "fs";
import { CleanCsResponse, CsBalance } from "./interface";
import path from "path";

const prisma = new PrismaClient();
const ACCESS_TOKEN: string = process.env.CS_ACCESS_TOKEN as string;
const ACCT_BALANCES_URL =
  "https://cs-india.coinswitch.co/api/v1/custody-wallet-user/account-balances";

const cleanupEntry = (apiEntry: CsBalance): CleanCsResponse => {
  const coin: CleanCsResponse["coin"] = {
    name: apiEntry.coin.name,
    symbol: apiEntry.coin.symbol,
    iconUrl: apiEntry.coin.logo,
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

const getLocalIconPath = (symbol: string): string =>
  path.join(__dirname, "../public", "icons", `${symbol}.png`);

const downloadIcon = async (symbol: string, url: string): Promise<void> => {
  const response = await fetch(url);
  const fileStream = createWriteStream(getLocalIconPath(symbol));
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
};

const dataCollector = async () => {
  prisma.$connect();
  const { id: timeId } = await prisma.time.create({ data: {} });
  const prices = await getCurrentCoinPrices();
  const coins = await prisma.coin.findMany();
  for (const price of prices) {
    const coin =
      coins.find((c) => c.symbol === price.coin.symbol) ||
      (await prisma.coin.create({ data: price.coin }));
    if (!existsSync(getLocalIconPath(coin.symbol)))
      await downloadIcon(coin.symbol, price.coin.iconUrl);
    await prisma.history.create({
      data: {
        timeId,
        symbol: coin.symbol,
        buyPrice: price.buyPrice,
        sellPrice: price.sellPrice,
      },
    });
  }
  prisma.$disconnect();
};

const loop = async () => {
  dataCollector();
  const interval = 5 * 60 * 1000; // 5 minutes
  setInterval(dataCollector, interval);
};

loop();
