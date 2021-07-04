<script lang="ts">
  import type { Coin, History } from "../interface";

  let selectedCoin = "btc";

  async function getCoins(): Promise<Coin[]> {
    const response = await fetch(`http://localhost:3000/coins`);
    const json = await response.json();
    return json;
  }

  async function getHistory(symbol: string): Promise<History[]> {
    const response = await fetch(`http://localhost:3000/history/${symbol}`);
    const json = await response.json();
    return json;
  }
</script>

{#await getCoins()}
  <p>Loading coins...</p>
{:then coins}
  <select bind:value={selectedCoin}>
    {#each coins as coin}
      <option value="{coin.symbol}">{coin.name}</option>
    {/each}
  </select>
{:catch error}
  <p>Error occured in getting list of coins:</p>
  <pre>
    {error}
  </pre>
{/await}

{#await getHistory(selectedCoin)}
  <p>Loading coin history...</p>
{:then history}
  {#each history as entry}
    <li>{entry.time}: {entry.buyPrice} | {entry.sellPrice}</li>
  {/each}
{:catch error}
  <p>Error occured in getting history of coin:</p>
  <pre>
    {error}
  </pre>
{/await}
