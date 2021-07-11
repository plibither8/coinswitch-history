<script lang="ts">
  import type { Coin, History } from "../interface";
  import api, { API_BASE } from "../api";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import Container from "$lib/components/Container.svelte";
  import Icon, { Database, ViewList, Refresh } from "svelte-hero-icons";
  import fileDownload from 'js-file-download';

  const getCoins = () => api<Coin[]>('coins');

  const getStats = () => api<any>('status');

  const getPlotData = async (symbol: string): Promise<number[][]> => {
    ({ data: history } = await api<History[]>(`history/${symbol}`));
    const timestamps = history.map(entry => new Date(entry.time.time).getTime() / 1000);
    const buy = history.map(entry => entry.buyPrice);
    const sell = history.map(entry => entry.sellPrice);
    return [timestamps, buy, sell];
  }

  const renderHistoryPlot = async (selectedCoin: string) => {
    const plotRoot = document.querySelector('#plot');
    plotRoot.innerHTML = '';
    loadingPlot = true;
    const plotData = await getPlotData(selectedCoin);
    loadingPlot = false;
    new uPlot({
      height: 600,
      width: 1200,
      series: [
        {},
        {
          label: `Buy ${selectedCoin.toUpperCase()}`,
          stroke: "red",
          width: 1,
        }, {
          label: `Sell ${selectedCoin.toUpperCase()}`,
          stroke: "green",
          width: 1,
        }
      ],
    }, plotData, plotRoot);
  }

  let stats: any = {};
  let coins: Coin[] = [];
  let history: History[] = [];
  let selectedCoin = "btc";
  let mounted = false;
  let uPlot;
  let loadingPlot = false;
  let refreshing = false;

  const downloadJson = () => {
    const data = JSON.stringify(history, null, 2);
    fileDownload(data, `${selectedCoin}_${new Date().toISOString()}.json`);
  }

  const downloadCsv = () => {
    const rows = [
      ["Time", "Buy price", "Sell price"].join(","),
      ...history.map(history => [
        history.time.time,
        history.buyPrice,
        history.sellPrice,
      ].join(",")),
    ].join("\n");
    fileDownload(rows, `${selectedCoin}_${new Date().toISOString()}.csv`);
  }

  onMount(async () => {
    ({ data: stats } = await getStats());
    ({ data: coins } = await getCoins());
    uPlot = (await import("uplot")).default;
    mounted = true;
  });

  const refresh = async () => {
    ({ data: stats } = await getStats());
    ({ data: coins } = await getCoins());
    await renderHistoryPlot(selectedCoin);
  }

  $: {
    if (mounted) renderHistoryPlot(selectedCoin);
    mounted;
    selectedCoin;
  }
</script>

<Container className="bg-gray-100 border-b">
  <div class="flex items-center space-x-3">
    <img class="h-7 w-7" src="/logo.png" alt="CoinSwitch Kuber logo" />
    <h1 class="text-2xl font-bold text-black">CoinSwitch History</h1>
  </div>
  <p class="text-lg text-gray-700 max-w-2xl leading-relaxed">Explore and download the history and timeseries data of all crypto-INR pairs offered by the CoinSwitch exchange.</p>
  <p class="italic text-gray-500 max-w-2xl leading-relaxed">"CoinSwitch History" is not affiliated to or endorsed by CoinSwitch Kuber.</p>
</Container>

<Container className="bg-gray-50 border-b">
  <h1 class="text-lg font-bold text-gray-900">Stats</h1>
  {#if Object.keys(stats).length}
    <ul class="space-y-1">
      <li class="text-gray-700 leading-relaxed list-disc list-inside">Last updated <strong>{stats.lastUpdated.relative}</strong> at {new Date(stats.lastUpdated.absolute).toLocaleString()}</li>
      <li class="text-gray-700 leading-relaxed list-disc list-inside"><strong>{new Intl.NumberFormat().format(stats.count.time)} times</strong> recorded since {new Date(stats.firstTime).toLocaleString()}</li>
      <li class="text-gray-700 leading-relaxed list-disc list-inside">Database filesize is <strong>{stats.dbFileSize}</strong></li>
    </ul>
  {:else}
    <p class="text-gray-700 leading-relaxed">Loading...</p>
  {/if}
</Container>

<Container className="-mb-10">
  <div class="space-y-1">
    <h1 class="text-xl font-bold text-gray-700">1. Select a coin</h1>
    <p class="text-base text-gray-600 leading-relaxed">Choose from the {coins.length} coins available on the exchange</p>
  </div>

  {#if coins.length}
    <div class="flex items-center space-x-5">
      <img class="h-7 w-7" src="{API_BASE}icons/{selectedCoin}.png" alt=""/>
      <select
        bind:value={selectedCoin}
        class="p-3 rounded bg-gray-50 border text-gray-800 font-bold"
      >
        {#each coins as coin}
          <option value={coin.symbol}>{coin.name}</option>
        {/each}
      </select>
      <button
        class="transition border focus:ring-2 ring-gray-200 bg-gray-50 hover:bg-gray-100 rounded p-3 text-gray-700 flex items-center text-sm"
        on:click={async () => {
          refreshing = true;
          await refresh();
          refreshing = false;
        }}
      >
        <Icon src={Refresh} size="16" class="text-gray-700 {refreshing && 'animate-spin'}" solid />
      </button>
    </div>
  {:else}
    <p>Loading coins...</p>
  {/if}
</Container>

<Container>
  <div class="space-y-1">
    <h1 class="text-xl font-bold text-gray-700">2. Explore the charts and details</h1>
    <p class="text-base text-gray-600 leading-relaxed">Hover to see prices, select ranges to zoom in. Charts are optimized for desktop, just btw.</p>
  </div>

</Container>

<section class="flex justify-center">
  <div class="mx-5 p-5 md:p-10 rounded-lg md:rounded-xl shadow-md md:shadow-lg bg-white max-w-7xl overflow-auto">
    {#if loadingPlot}
      <p transition:slide>Loading history...</p>
    {:else}
      <div transition:slide id="plot" class="flex"></div>
    {/if}
  </div>
</section>

<Container>
  <div class="space-y-1">
    <h1 class="text-xl font-bold text-gray-700">3. Download the data</h1>
    <p class="text-base text-gray-600 leading-relaxed">Download the timeseries data for the {selectedCoin.toUpperCase()}.</p>
  </div>
  <div class="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0">
    <button
      class="transition border focus:ring-2 ring-green-100 bg-green-50 hover:bg-green-100 hover:border-green-300 border-green-200 rounded flex items-center py-2 px-3 space-x-3 text-green-700"
      on:click={downloadCsv}
    >
      <Icon src={ViewList} size="22" class="text-green-700" />
      <span>Download CSV</span>
    </button>
    <button
      class="transition border focus:ring-2 ring-yellow-100 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-300 border-yellow-200 rounded flex items-center py-2 px-3 space-x-3 text-yellow-700"
      on:click={downloadJson}
    >
      <Icon src={Database} size="22" class="text-yellow-700" />
      <span>Download JSON</span>
    </button>
  </div>
</Container>

<Container className="bg-gray-50 border-t">
  <h1 class="text-lg font-bold text-gray-900">API</h1>
  <p class="leading-normal text-gray-700">The API used by this webapp to query coins and history is openly available, so long as my VPS has the capacity to cater to its requests. Take note:
  </p>
  <ul class="space-y-1">
    <li class="text-gray-700 list-inside list-disc"><strong>Base URL:</strong> <span>https://api.cs.mhr.cx/</span></li>
    <li class="text-gray-700 list-inside list-disc">No authentication/authorization or API key required.</li>
    <li class="text-gray-700 list-inside list-disc">No hard rate limits imposed, please use it sanely. If abused, I'll have to take appropriate actions 😞.</li>
    <li class="text-gray-700 list-inside list-disc">Endpoints and request/response shapes are subject to change without warning.</li>
  </ul>
  <div class="space-y-3">
    <h2 class="text-base text-gray-700 font-bold">Get history of a coin</h2>
    <div class="space-x-3">
      <span class="text-xs p-1 rounded bg-green-800 text-white font-bold">GET</span>
      <span class="bg-gray-200 p-1 rounded text-sm font-mono">/history/:symbol</span>
    </div>
    <p class="text-sm text-gray-600 leading-normal">Get the history of a coin, specified by its symbol in lowercase.</p>
    <details class="space-y-2">
      <summary class="text-sm text-gray-600">Example response</summary>
      <pre class="text-xs bg-gray-200 rounded p-2 overflow-auto">{`[
  {
    "id": 50262,
    "symbol": "btc",
    "buyPrice": "2603664",
    "sellPrice": "2575367.4595",
    "timeId": 838,
    "time": {
      "id": 838,
      "time": "2021-07-11T06:32:43.651Z"
    }
  },
  ...
]`}
      </pre>
    </details>
  </div>
  <div class="space-y-3">
    <h2 class="text-base text-gray-700 font-bold">Get list of coins</h2>
    <div class="space-x-3">
      <span class="text-xs p-1 rounded bg-green-800 text-white font-bold">GET</span>
      <span class="bg-gray-200 p-1 rounded text-sm font-mono">/coins</span>
    </div>
    <p class="text-sm text-gray-600 leading-normal">Get list of coins available on the exchange and this service.</p>
    <details class="space-y-2">
      <summary class="text-sm text-gray-600">Example response</summary>
      <pre class="text-xs bg-gray-200 rounded p-2 overflow-auto">{`[
  {
    "id": 124,
    "symbol": "zrx",
    "name": "0x"
  },
  {
    "id": 146,
    "symbol": "1inch",
    "name": "1inch"
  },
  ...
]`}
      </pre>
    </details>
  </div>
  <div class="space-y-3">
    <h2 class="text-base text-gray-700 font-bold">Get stats and status of this service and DB</h2>
    <div class="space-x-3">
      <span class="text-xs p-1 rounded bg-green-800 text-white font-bold">GET</span>
      <span class="bg-gray-200 p-1 rounded text-sm font-mono">/status</span>
    </div>
    <p class="text-sm text-gray-600 leading-normal">Get statistics and health information regarding the database and its items.</p>
    <details class="space-y-2">
      <summary class="text-sm text-gray-600">Example response</summary>
      <pre class="text-xs bg-gray-200 rounded p-2 overflow-auto">{`{
  "dbFileSize": "340 KB",
  "firstTime": "2021-07-11T06:32:43.651Z",
  "lastUpdated": {
    "relative": "4 minutes ago",
    "absolute": "2021-07-11T15:55:04.643Z"
  },
  "count": {
    "time": 113,
    "coin": 83,
    "history": 9379
  }
}`}
      </pre>
    </details>
  </div>
</Container>

<Container className="bg-gray-100 border-t">
  <h1 class="text-lg font-bold text-gray-900">About this project</h1>
  <p class="text-gray-700 leading-relaxed">
    As expected, this was started off as and still is a (better) way to view historical price data of INR-Crypto pairs offered by CoinSwitch to get a better insight (the app has smoothened-out, hard-to-read graphs with non-granular intervals).
  </p>
  <p class="text-gray-700 leading-relaxed">Built by me, <a class="underline" href="https://mihir.ch" rel="noopener" target="_blank">Mihir Chaturvedi</a> over two boring Sundays. Data is sourced through their internal API calls, and updates every five minutes. Powered by uPlot, SvelteKit, Tailwind, Prisma and SQLite and seemingly bad code :).</p>
  <a class="underline text-black inline-block" href="https://github.com/plibither8/coinswitch-history">View code on GitHub</a>
</Container>

<style global>
  .uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: content-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;z-index: 100;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;pointer-events: none;will-change: transform;z-index: 100;/*this has to be !important since we set inline "background" shorthand */background-clip: content-box !important;}.u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}
</style>
