import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const timesPost238 = await prisma.time.findMany({
    where: {
      id: {
        gte: 238
      }
    },
    include: {
      history: true,
    }
  });
  for (const time of timesPost238) {
    if (time.time.getMinutes() % 5) {
      const ids = time.history.map(h => h.id);
      await prisma.history.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      });
      await prisma.time.delete({
        where: {
          id: time.id
        }
      })
    }
  }
  prisma.$disconnect();
}

main();
