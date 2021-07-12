<script lang="ts">
  import { onMount } from "svelte";
  import type { Coin } from "$lib/interface";
  import api, { API_BASE } from "$lib/api";
  import { externalData, selectedCoin } from "$lib/store";
  import Container from "./Container.svelte";
  import Icon, { CursorClick, Refresh } from "svelte-hero-icons";
  import SectionHeading from "./SectionHeading.svelte";

  let coins: Coin[] = [];
  let refreshing = false;

  onMount(async () => {
    ({ data: coins } = await api<Coin[]>("coins"));
    $externalData.coins = coins;
  });
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
      <button
        class="transition border focus:ring-2 ring-gray-200 bg-gray-50 hover:bg-gray-100 rounded p-3 text-gray-700 flex items-center text-sm"
        on:click="{async () => {
          refreshing = true;
          // await refresh();
          refreshing = false;
        }}"
      >
        <Icon
          src="{Refresh}"
          size="16"
          class="text-gray-700 {refreshing && 'animate-spin'}"
          solid
        />
      </button>
    </div>
  {:else}
    <p>Loading coins...</p>
  {/if}
</Container>
