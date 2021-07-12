<script lang="ts">
  import type { Coin } from "$lib/interface";
  import { API_BASE } from "$lib/api";
  import { externalData, selectedCoin } from "$lib/store";
  import Container from "./Container.svelte";
  import { CursorClick } from "svelte-hero-icons";
  import SectionHeading from "./SectionHeading.svelte";
  import Refresh from "./Refresh.svelte";

  let coins: Coin[] = [];
  $: ({ coins } = $externalData);
</script>

<Container className="-mb-10">
  <SectionHeading
    heading="Select a coin"
    description="Choose from the {coins.length} coins available on the exchange."
    icon="{CursorClick}"
  />
  {#if coins.length}
    <div class="flex items-center space-x-5">
      <img class="h-7 w-7" src="{API_BASE}icons/{$selectedCoin}.png" alt="" />
      <select
        bind:value="{$selectedCoin}"
        class="p-3 rounded bg-gray-50 border text-gray-800 font-bold"
      >
        {#each coins as coin}
          <option value="{coin.symbol}">{coin.name}</option>
        {/each}
      </select>
      <Refresh />
    </div>
  {:else}
    <p>Loading coins...</p>
  {/if}
</Container>
