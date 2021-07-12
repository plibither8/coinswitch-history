# 🪙 CoinSwitch History API

Built using:

- Prisma
- SQLite
- Polka

## Developing

Run the development server of the API that watches for file changes through Nodemon.

```bash
npm run dev
```

## Building

Build the production files, using the `tsc` compiler.

```bash
npm run build
```

Start production API server:

```bash
npm start
```

Run data collector:

```bash
npm run start-coinswitch        # to run once
npm run start-coinswitch loop   # to run in a loop, every five minutes
```
