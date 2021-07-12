<script lang="ts">
  import { chartSettings } from "$lib/store";
  const displayRangeSettings = false;
</script>

<div class="space-y-1 text-sm">
  <div class="flex items-baseline space-x-3 overflow-auto py-2">
    <strong class="text-gray-500">Interval</strong>
    {#each $chartSettings.intervals.values as interval, i}
      <button
        class="uppercase font-bold p-1 rounded text-xs {$chartSettings.intervals
          .selected === i
          ? 'ring-2 ring-green-600 text-green-700 bg-green-200'
          : 'text-gray-500 bg-gray-200'}"
        on:click="{() => ($chartSettings.intervals.selected = i)}"
        >{interval.label}</button
      >
    {/each}
  </div>
  {#if displayRangeSettings}
    <div class="flex items-baseline space-x-3 overflow-auto py-2">
      <strong class="text-gray-500">Range</strong>
      {#each $chartSettings.ranges.values as range, i}
        <button
          class="uppercase font-bold p-1 rounded text-xs {$chartSettings.ranges
            .selected === i
            ? 'ring-2 ring-green-600 text-green-700 bg-green-200'
            : 'text-gray-500 bg-gray-200'}"
          on:click="{() => ($chartSettings.ranges.selected = i)}"
          >{range}</button
        >
      {/each}
    </div>
  {/if}
</div>
