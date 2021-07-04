import polka from "polka";
// @ts-ignore
import send from "@polka/send-type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server = polka();

// Get list of coins available
server.get("/coins", async (req, res) => {
  const coins = await prisma.coin.findMany();
  send(res, 200, coins);
});

// Get history of single coin
server.get("/history/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const history = await prisma.history.findMany({
    where: {
      symbol,
    },
  });
  send(res, 200, history);
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
