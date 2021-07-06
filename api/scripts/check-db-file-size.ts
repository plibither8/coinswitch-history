import { stat } from "fs/promises";
import path from "path";
import fileSize from "filesize";

const main = async () => {
  const dbfile = path.join(__dirname, '../prisma', 'dev.db');
  const { size } = await stat(dbfile);
  console.log(size, fileSize(size), fileSize(size, { base: 10 }));
}

main();
