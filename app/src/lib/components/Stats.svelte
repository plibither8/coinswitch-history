<script lang="ts">
  import Container from "./Container.svelte";
  import ListItem from "./ListItem.svelte";
  import { externalData } from "$lib/store";
  import Ping from "./Ping.svelte";

  const localDate = (date: string): string => new Date(date).toLocaleString();

  let stats: any = {};
  $: ({ stats } = $externalData);
</script>

<Container className="bg-gray-50 border-b">
  <h1 class="text-lg font-bold text-gray-900">Stats</h1>
  {#if Object.keys(stats).length}
    <ul class="space-y-1">
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
