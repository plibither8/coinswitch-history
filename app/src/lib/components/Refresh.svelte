<script lang="ts">
  import Icon, { Refresh } from "svelte-hero-icons";
  import { updating, updateData } from "$lib/store";
</script>

<button
  class="transition border focus:ring-2 ring-gray-200 bg-gray-50 hover:bg-gray-100 rounded p-3 text-gray-700 flex items-center text-sm"
  on:click="{async () => await updateData()}"
>
  <Icon
    src="{Refresh}"
    size="16"
    class="text-gray-700 {$updating && 'animate-spin'}"
    solid
  />
</button>
