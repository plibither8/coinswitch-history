<script lang="ts">
  export let title: string;
  export let method: "GET" | "POST";
  export let endpoint: string;
  export let description: string;
  export let exampleResponse: any;
</script>

<article class="space-y-3">
  <h2 class="text-base text-gray-700 font-bold">{title}</h2>
  <div class="space-x-3">
    <span class="text-xs p-1 rounded bg-green-800 text-white font-bold"
      >{method}</span
    >
    <span class="bg-gray-200 p-1 rounded text-sm font-mono">{endpoint}</span>
  </div>
  <p class="text-sm text-gray-600 leading-normal">
    {description}
  </p>
  <details class="space-y-2">
    <summary class="text-sm text-gray-600">Example response</summary>
    <pre
      class="text-xs bg-gray-200 rounded p-2 overflow-auto">
      {JSON.stringify(exampleResponse, null, 2)}
    </pre>
  </details>
</article>
