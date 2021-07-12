<script lang="ts">
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { externalData, updating } from "$lib/store";
  import Container from "./Container.svelte";
  import ListItem from "./ListItem.svelte";
  import Ping from "./Ping.svelte";
  import type { Stats } from "$lib/interface";

  const localDate = (date: string): string => new Date(date).toLocaleString();

  let stats: Stats;
  $: ({ stats } = $externalData);
</script>

<Container className="bg-gray-50 border-b">
  <h1 class="text-lg font-bold text-gray-900">Stats</h1>
  {#if stats && !$updating}
    <ul
      transition:slide="{{ duration: 200, easing: cubicOut }}"
      class="space-y-1"
    >
      <ListItem>
        Last updated
        <Ping />
        <strong>{stats.lastUpdated.relative}</strong>
        at {localDate(stats.lastUpdated.absolute)}
      </ListItem>
      <ListItem>
        <strong>{new Intl.NumberFormat().format(stats.count.time)} times</strong
        >
        recorded since {localDate(stats.firstTime)}
      </ListItem>
      <ListItem>
        Database filesize is <strong>{stats.dbFileSize}</strong>
      </ListItem>
    </ul>
  {:else}
    <p class="text-gray-700 leading-relaxed">Loading statistics...</p>
  {/if}
</Container>
