<script lang="ts">
  export let className: string = "";
</script>

<section class="{className}">
  <div class="max-w-4xl mx-auto py-10 px-5 space-y-5">
    <slot />
  </div>
</section>
