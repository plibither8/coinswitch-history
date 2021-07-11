<script lang="ts">
  import fileDownload from "js-file-download";
  import Icon, { Database, ViewList } from "svelte-hero-icons";
  import { externalData, selectedCoin } from "$lib/store";
  import Container from "./Container.svelte";

  const getFilename = (ext: string): string =>
    `${$selectedCoin}_${new Date().toISOString()}.${ext}`;

  const downloadJson = () => {
    const data = JSON.stringify($externalData.history, null, 2);
    fileDownload(data, getFilename("json"));
  };

  const downloadCsv = () => {
    const data = [
      ["Time", "Buy price", "Sell price"].join(","),
      ...$externalData.history.map((item) =>
        [item.time.time, item.buyPrice, item.sellPrice].join(",")
      ),
    ].join("\n");
    fileDownload(data, getFilename("csv"));
  };
</script>

<Container>
  <div class="space-y-1">
    <h1 class="text-xl font-bold text-gray-700">3. Download the data</h1>
    <p class="text-base text-gray-600 leading-relaxed">
      Download the timeseries data for the {$selectedCoin.toUpperCase()}.
    </p>
  </div>
  <div class="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0">
    <button
      class="space-x-3 ring-green-100 bg-green-50 hover:bg-green-100 hover:border-green-300 border-green-200 text-green-700"
      on:click="{downloadCsv}"
    >
      <Icon src="{ViewList}" size="22" class="text-green-700" />
      <span>Download CSV</span>
    </button>
    <button
      class="space-x-3 ring-yellow-100 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-300 border-yellow-200 text-yellow-700"
      on:click="{downloadJson}"
    >
      <Icon src="{Database}" size="22" class="text-yellow-700" />
      <span>Download JSON</span>
    </button>
  </div>
</Container>

<style lang="postcss">
  button {
    @apply transition border focus:ring-2 rounded flex items-center py-2 px-3;
  }
</style>
