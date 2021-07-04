import polka from "polka";
// @ts-ignore
import send from "@polka/send-type";
import { PrismaClient, Time } from "@prisma/client";
import { stat } from "fs/promises";
import path from "path";
import fileSize from "filesize";
import { format as timeAgo } from "timeago.js";

const prisma = new PrismaClient();
const server = polka();

const cors = (res: any): any => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Range"
  );
  return res;
};

// Get list of coins available
server.get("/coins", async (req, res) => {
  const coins = await prisma.coin.findMany({
    orderBy: { name: "asc" },
  });
  send(cors(res), 200, coins);
});

// Get history of single coin
server.get("/history/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const history = await prisma.history.findMany({
    where: { symbol },
    include: { time: true },
  });
  send(cors(res), 200, history);
});

// Show simple stats of the db
server.get("/status", async (req, res) => {
  const dbPath = path.join(__dirname, "../prisma", "dev.db");
  const dbFileSize = fileSize((await stat(dbPath)).size);
  const { time: lastUpdatedTime } = (await prisma.time.findFirst({
    orderBy: { id: "desc" },
  })) as Time;
  const count = {
    time: await prisma.time.count(),
    coin: await prisma.coin.count(),
    history: await prisma.history.count(),
  };
  send(cors(res), 200, {
    dbFileSize,
    lastUpdated: {
      relative: timeAgo(lastUpdatedTime),
      absolute: lastUpdatedTime,
    },
    count,
  });
});

server.server?.on("close", () => {
  console.info("Disconnecting Prisma from API server...");
  prisma.$disconnect();
});

export const startServer = () => {
  const { API_SERVER_PORT } = process.env as { API_SERVER_PORT: string };
  server.listen(API_SERVER_PORT, () => {
    console.info(`API server started at http://localhost:${API_SERVER_PORT}`);
  });
};

export default startServer;
