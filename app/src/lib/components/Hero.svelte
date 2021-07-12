<script lang="ts">
  import CoinLogo from "./CoinLogo.svelte";
  import Container from "./Container.svelte";
</script>

<Container className="bg-gray-100 border-b">
  <div class="flex items-center space-x-3">
    <CoinLogo />
    <h1 class="text-2xl font-bold text-gray-900">CoinSwitch History</h1>
  </div>
  <p class="text-lg text-gray-700 max-w-2xl leading-relaxed">
    Explore and download the history and timeseries data of all crypto-INR pairs
    offered by the CoinSwitch exchange.
  </p>
  <p class="italic text-gray-500 max-w-2xl leading-relaxed">
    This project, "CoinSwitch History", is not affiliated to or endorsed by
    CoinSwitch Kuber.
  </p>
</Container>
