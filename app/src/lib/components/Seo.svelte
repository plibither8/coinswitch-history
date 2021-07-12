<script lang="ts">
  import SvelteSeo from "svelte-seo";
  const title = "CoinSwitch History";
  const description =
    "Explore and download the history and timeseries data of all crypto-INR pairs offered by the CoinSwitch exchange";
  const keywords =
    "coinswitch, cryptocurrency, exchange, india, coinswitch kuber, bitcoin, mihir chaturvedi, plibither8";
  const url = "https://cs.mhr.cx";
  const image = "https://cs.mhr.cx/logo.png";
</script>

<SvelteSeo
  title="{title}"
  description="{description}"
  keywords="{keywords}"
  openGraph="{{
    title,
    description,
    url,
    images: [
      {
        url: image,
        alt: title,
      },
    ],
  }}"
  twitter="{{
    title,
    description,
    site: url,
    image,
    imageAlt: title,
  }}"
/>
