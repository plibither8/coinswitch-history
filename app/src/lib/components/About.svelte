<script>
  import Container from "./Container.svelte";
</script>

<Container className="bg-gray-100 border-t">
  <h1 class="text-lg font-bold text-gray-900">About this project</h1>
  <p class="text-gray-700 leading-relaxed">
    As expected, this was started off as and still is a (better) way to view
    historical price data of INR-Crypto pairs offered by CoinSwitch to get a
    better insight (the app has smoothened-out, hard-to-read graphs with
    non-granular intervals).
  </p>
  <p class="text-gray-700 leading-relaxed">
    Built by me, <a
      class="underline"
      href="https://mihir.ch"
      rel="noopener"
      target="_blank">Mihir Chaturvedi</a
    > over two boring Sundays. Data is sourced through their internal API calls,
    and updates every five minutes. Powered by uPlot, SvelteKit, Tailwind, Prisma,
    SQLite and seemingly bad code :).
  </p>
  <a
    class="underline text-black inline-block"
    href="https://github.com/plibither8/coinswitch-history"
    >View code on GitHub</a
  >
</Container>
