<script lang="ts">
  import Container from "./Container.svelte";
  import ListItem from "./ListItem.svelte";
  import ApiEndpoint from "./ApiEndpoint.svelte";
  import { externalData } from "$lib/store";

  interface Endpoint {
    title: string;
    method: "GET" | "POST";
    endpoint: string;
    description: string;
    exampleResponse: any;
  }

  let endpoints: Endpoint[] = [];
  $: endpoints = [
    {
      title: "Get history of a coin",
      method: "GET",
      endpoint: "/history/:symbol",
      description:
        "Get the history of a coin, specified by its symbol in lowercase.",
      exampleResponse: [$externalData.history[0]],
    },
    {
      title: "Get list of coins",
      method: "GET",
      endpoint: "/coins",
      description:
        "Get list of coins available on the exchange and this service.",
      exampleResponse: [$externalData.coins[0]],
    },
    {
      title: "Get stats and status of this service and DB",
      method: "GET",
      endpoint: "/status",
      description:
        "Get statistics and health information regarding the database and its items.",
      exampleResponse: $externalData.stats,
    },
  ];
</script>

<Container className="bg-gray-50 border-t">
  <h1 class="text-lg font-bold text-gray-900">API</h1>
  <p class="leading-normal text-gray-700">
    The API used by this webapp to query coins and history is openly available,
    so long as my VPS has the capacity to cater to its requests. Take note:
  </p>
  <ul class="space-y-1">
    <ListItem>
      <strong>Base URL:</strong> <span>https://api.cs.mhr.cx/</span>
    </ListItem>
    <ListItem>No authentication/authorization or API key required.</ListItem>
    <ListItem>
      No hard rate limits imposed, please use it sanely. If abused, I'll have to
      take appropriate actions 😞.
    </ListItem>
    <ListItem>
      Endpoints and request/response shapes are subject to change without
      warning.
    </ListItem>
  </ul>

  {#each endpoints as endpoint}
    <ApiEndpoint {...endpoint} />
  {/each}
</Container>
