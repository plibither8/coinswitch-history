<script lang="ts">
  import type { History } from "$lib/interface";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import Container from "./Container.svelte";
  import api from "$lib/api";
  import { externalData, selectedCoin } from "$lib/store";

  const getPlotData = async (symbol: string): Promise<number[][]> => {
    $externalData.history = (await api<History[]>(`history/${symbol}`)).data;
    const { history } = $externalData;
    const timestamps = history.map(
      (entry) => new Date(entry.time.time).getTime() / 1000
    );
    const buy = history.map((entry) => entry.buyPrice);
    const sell = history.map((entry) => entry.sellPrice);
    return [timestamps, buy, sell];
  };

  const renderHistoryPlot = async (coin: string) => {
    const plotRoot = document.querySelector("#plot");
    plotRoot.innerHTML = "";

    loadingPlot = true;
    const plotData = await getPlotData(coin);
    loadingPlot = false;

    new uPlot(
      {
        height: 600,
        width: 1200,
        series: [
          {},
          {
            label: `Buy ${coin.toUpperCase()}`,
            stroke: "red",
            width: 1,
          },
          {
            label: `Sell ${coin.toUpperCase()}`,
            stroke: "green",
            width: 1,
          },
        ],
      },
      plotData,
      plotRoot
    );
  };

  let uPlot;
  let mounted = false;
  let loadingPlot = false;
  $: mounted && renderHistoryPlot($selectedCoin);

  onMount(async () => {
    uPlot = (await import("uplot")).default;
    mounted = true;
  });
</script>

<Container>
  <div class="space-y-1">
    <h1 class="text-xl font-bold text-gray-700">
      2. Explore the charts and details
    </h1>
    <p class="text-base text-gray-600 leading-relaxed">
      Hover to see prices, select ranges to zoom in. Charts are optimized for
      desktop, just btw.
    </p>
  </div>
</Container>

<section class="flex justify-center">
  <div
    class="mx-5 p-5 md:p-10 rounded-lg md:rounded-xl shadow-md md:shadow-lg bg-white max-w-7xl overflow-auto"
  >
    {#if loadingPlot}
      <p transition:slide>Loading history...</p>
    {/if}
    <div transition:slide id="plot" class="flex"></div>
  </div>
</section>

<style global>
  .uplot,
  .uplot *,
  .uplot *::before,
  .uplot *::after {
    box-sizing: border-box;
  }
  .uplot {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji";
    line-height: 1.5;
    width: min-content;
  }
  .u-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .u-wrap {
    position: relative;
    user-select: none;
  }
  .u-over,
  .u-under {
    position: absolute;
  }
  .u-under {
    overflow: hidden;
  }
  .uplot canvas {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .u-legend {
    font-size: 14px;
    margin: auto;
    text-align: center;
  }
  .u-inline {
    display: block;
  }
  .u-inline * {
    display: inline-block;
  }
  .u-inline tr {
    margin-right: 16px;
  }
  .u-legend th {
    font-weight: 600;
  }
  .u-legend th > * {
    vertical-align: middle;
    display: inline-block;
  }
  .u-legend .u-marker {
    width: 1em;
    height: 1em;
    margin-right: 4px;
    background-clip: content-box !important;
  }
  .u-inline.u-live th::after {
    content: ":";
    vertical-align: middle;
  }
  .u-inline:not(.u-live) .u-value {
    display: none;
  }
  .u-series > * {
    padding: 4px;
  }
  .u-series th {
    cursor: pointer;
  }
  .u-legend .u-off > * {
    opacity: 0.3;
  }
  .u-select {
    background: rgba(0, 0, 0, 0.07);
    position: absolute;
    pointer-events: none;
  }
  .u-cursor-x,
  .u-cursor-y {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    will-change: transform;
    z-index: 100;
  }
  .u-hz .u-cursor-x,
  .u-vt .u-cursor-y {
    height: 100%;
    border-right: 1px dashed #607d8b;
  }
  .u-hz .u-cursor-y,
  .u-vt .u-cursor-x {
    width: 100%;
    border-bottom: 1px dashed #607d8b;
  }
  .u-cursor-pt {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
    z-index: 100; /*this has to be !important since we set inline "background" shorthand */
    background-clip: content-box !important;
  }
  .u-select.u-off,
  .u-cursor-x.u-off,
  .u-cursor-y.u-off,
  .u-cursor-pt.u-off {
    display: none;
  }
</style>
