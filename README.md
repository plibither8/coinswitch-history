# 🪙 [CoinSwitch History](https://cs.mhr.cx)

> Interactively explore granular (5-min intervals) history of buy/sell prices of X-INR pairs from [CoinSwitch](https://coinswitch.co).

[Visit the app here: **cx.mhr.cx**](https://cs.mhr.cx)

As expected, this was started off as and still is a (better) way to view historical price data of crypto-INR pairs offered by CoinSwitch to get a better insight (the app has smoothened-out, hard-to-read graphs with non-granular intervals).

Built by me over two boring Sundays. Data is sourced through their internal API calls, and updates every five minutes. Powered by uPlot, SvelteKit, Tailwind, Prisma, SQLite and seemingly bad code :).

> **Note:** This project is not affiliated to or endorsed by CoinSwitch Kuber.

## Structure

### API

Directory: [**/api**](/api)

[View README](/api/README.md)

### Client

Directory: [**/app**](/app)

[View README](/app/README.md)

## License

[MIT](LICENSE)
