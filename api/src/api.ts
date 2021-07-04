import polka from "polka";
// @ts-ignore
import send from "@polka/send-type";
import { PrismaClient } from "@prisma/client";

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
    where: {
      symbol,
    },
  });
  send(cors(res), 200, history);
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
