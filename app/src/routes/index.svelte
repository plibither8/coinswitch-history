<script lang="ts">
  import { onMount } from "svelte";
  import { updateData } from "$lib/store";
  import Seo from "$lib/components/Seo.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Stats from "$lib/components/Stats.svelte";
  import CoinSelection from "$lib/components/CoinSelection.svelte";
  import CoinChart from "$lib/components/CoinChart.svelte";
  import CoinDownload from "$lib/components/CoinDownload.svelte";
  import ApiDetails from "$lib/components/ApiDetails.svelte";
  import About from "$lib/components/About.svelte";

  onMount(async () => {
    await updateData();
  });
</script>

<Seo />

<header>
  <Hero />
</header>

<main>
  <Stats />

  <CoinSelection />

  <CoinChart />

  <CoinDownload />

  <ApiDetails />
</main>

<footer>
  <About />
</footer>
