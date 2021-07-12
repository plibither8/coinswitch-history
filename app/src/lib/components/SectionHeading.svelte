<script lang="ts">
  import Icon from "svelte-hero-icons";

  export let heading: string;
  export let description: string;
  export let icon: any;
</script>

<div class="space-x-6 flex items-center">
  <Icon src="{icon}" size="22" class="text-gray-600" />
  <div class="space-y-1">
    <h1 class="text-xl font-bold text-gray-700">
      {heading}
    </h1>
    <p class="text-base text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
</div>
