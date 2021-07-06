<script lang="ts">
  import type { Coin, History } from "../interface";
  import api, { API_BASE } from "../api";
  import { onMount } from "svelte";
import Container from "$lib/components/Container.svelte";

  const getCoins = () => api<Coin[]>('coins');

  const getPlotData = async (symbol: string): Promise<number[][]> => {
    const { data: history, error } = await api<History[]>(`history/${symbol}`);
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

  let selectedCoin = "btc";
  let mounted = false;
  let uPlot;
  let loadingPlot = false;

  onMount(async () => {
    uPlot = (await import("uplot")).default;
    mounted = true;
  });

  $: {
    if (mounted) renderHistoryPlot(selectedCoin);
    mounted;
    selectedCoin;
  }
</script>

<Container>
  <h1 class="text-4xl font-bold text-indigo-900">CoinSwitch History</h1>
  <p class="text-lg text-indigo-900 max-w-2xl leading-relaxed">Explore and download the history and timeseries data of all crypto-INR pairs offered by the CoinSwitch exchange.</p>
</Container>

<Container>
  <h1 class="text-3xl font-bold text-indigo-700">
    <span>1.</span>
    <span>Select a coin</span>
  </h1>

  {#await getCoins()}
    <p>Loading coins...</p>
  {:then { error, data: coins }}
    {#if error}
      <p>Error occured in getting list of coins:</p>
      <pre>
        {error}
      </pre>
    {:else}
      <select bind:value={selectedCoin}>
        {#each coins as coin}
          <option value="{coin.symbol}">{coin.name}</option>
        {/each}
      </select>
    {/if}
  {/await}
</Container>

<Container>
  <h1 class="text-3xl font-bold text-indigo-600">
    <span>2.</span>
    <span>Explore and view the charts</span>
  </h1>

  {#if loadingPlot}
    <p>Loading history...</p>
  {/if}

  <img src="{API_BASE}icons/{selectedCoin}.png" alt=""/>

  <div id="plot" class="overflow-scroll"></div>
</Container>

<Container>
  <h1 class="text-3xl font-bold text-indigo-500">
    <span>3.</span>
    <span>Download the data</span>
  </h1>
</Container>

<style global>
  .uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: content-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;z-index: 100;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;pointer-events: none;will-change: transform;z-index: 100;/*this has to be !important since we set inline "background" shorthand */background-clip: content-box !important;}.u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}
</style>
