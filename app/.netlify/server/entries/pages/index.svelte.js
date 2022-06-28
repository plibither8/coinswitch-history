var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_0a594dbc = require("../../chunks/index-0a594dbc.js");
var import_js_file_download = require("js-file-download");
const subscriber_queue = [];
function writable(value, start = import_index_0a594dbc.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_0a594dbc.a)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_0a594dbc.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_0a594dbc.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const DEFAULT_SELECTED_COIN = "btc";
const env = {
  API_BASE: "https://api.coinswitch.mihir.ch/"
};
const { API_BASE } = env;
async function fetcher(endpoint) {
  const url2 = `${API_BASE}${endpoint}`;
  const value = {
    data: void 0,
    error: void 0
  };
  try {
    const response = await fetch(url2);
    const json = await response.json();
    value.data = json;
  } catch (error) {
    value.error = error;
  }
  return value;
}
const selectedCoin = writable(DEFAULT_SELECTED_COIN);
const externalData = writable({
  history: [[], [], []],
  coins: [],
  stats: void 0
});
const updating = writable(false);
const chartSettings = writable({
  intervals: {
    selected: 0,
    values: [
      {
        label: "5min",
        mod5: 1
      },
      {
        label: "10min",
        mod5: 2
      },
      {
        label: "30min",
        mod5: 6
      },
      {
        label: "1h",
        mod5: 12
      },
      {
        label: "3h",
        mod5: 36
      },
      {
        label: "6h",
        mod5: 72
      },
      {
        label: "1d",
        mod5: 288
      }
    ]
  },
  ranges: {
    selected: 0,
    values: ["1d", "3d", "1w", "1M"]
  }
});
const SvelteSeo = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let { title: title2 = void 0 } = $$props;
  let { noindex = false } = $$props;
  let { nofollow = false } = $$props;
  let { description: description2 = void 0 } = $$props;
  let { keywords: keywords2 = void 0 } = $$props;
  let { canonical = void 0 } = $$props;
  let { openGraph = void 0 } = $$props;
  let { twitter = void 0 } = $$props;
  let { jsonLd = void 0 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.noindex === void 0 && $$bindings.noindex && noindex !== void 0)
    $$bindings.noindex(noindex);
  if ($$props.nofollow === void 0 && $$bindings.nofollow && nofollow !== void 0)
    $$bindings.nofollow(nofollow);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords2 !== void 0)
    $$bindings.keywords(keywords2);
  if ($$props.canonical === void 0 && $$bindings.canonical && canonical !== void 0)
    $$bindings.canonical(canonical);
  if ($$props.openGraph === void 0 && $$bindings.openGraph && openGraph !== void 0)
    $$bindings.openGraph(openGraph);
  if ($$props.twitter === void 0 && $$bindings.twitter && twitter !== void 0)
    $$bindings.twitter(twitter);
  if ($$props.jsonLd === void 0 && $$bindings.jsonLd && jsonLd !== void 0)
    $$bindings.jsonLd(jsonLd);
  return `${$$result.head += `${title2 ? `${$$result.title = `<title>${(0, import_index_0a594dbc.e)(title2)}</title>`, ""}` : ``}<meta name="${"robots"}"${(0, import_index_0a594dbc.b)("content", `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`, 0)} data-svelte="svelte-1q8xl96"><meta name="${"googlebot"}"${(0, import_index_0a594dbc.b)("content", `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`, 0)} data-svelte="svelte-1q8xl96">${description2 ? `<meta name="${"description"}"${(0, import_index_0a594dbc.b)("content", description2, 0)} data-svelte="svelte-1q8xl96">` : ``}${canonical ? `<link rel="${"canonical"}"${(0, import_index_0a594dbc.b)("href", canonical, 0)} data-svelte="svelte-1q8xl96">` : ``}${keywords2 ? `<meta name="${"keywords"}"${(0, import_index_0a594dbc.b)("content", keywords2, 0)} data-svelte="svelte-1q8xl96">` : ``}${openGraph ? `${openGraph.title ? `<meta property="${"og:title"}"${(0, import_index_0a594dbc.b)("content", openGraph.title, 0)} data-svelte="svelte-1q8xl96">` : ``}

    ${openGraph.description ? `<meta property="${"og:description"}"${(0, import_index_0a594dbc.b)("content", openGraph.description, 0)} data-svelte="svelte-1q8xl96">` : ``}

    ${openGraph.url || canonical ? `<meta property="${"og:url"}"${(0, import_index_0a594dbc.b)("content", openGraph.url || canonical, 0)} data-svelte="svelte-1q8xl96">` : ``}

    ${openGraph.type ? `<meta property="${"og:type"}"${(0, import_index_0a594dbc.b)("content", openGraph.type.toLowerCase(), 0)} data-svelte="svelte-1q8xl96">` : ``}

    ${openGraph.article ? `${openGraph.article.publishedTime ? `<meta property="${"article:published_time"}"${(0, import_index_0a594dbc.b)("content", openGraph.article.publishedTime, 0)} data-svelte="svelte-1q8xl96">` : ``}

      ${openGraph.article.modifiedTime ? `<meta property="${"article:modified_time"}"${(0, import_index_0a594dbc.b)("content", openGraph.article.modifiedTime, 0)} data-svelte="svelte-1q8xl96">` : ``}

      ${openGraph.article.expirationTime ? `<meta property="${"article:expiration_time"}"${(0, import_index_0a594dbc.b)("content", openGraph.article.expirationTime, 0)} data-svelte="svelte-1q8xl96">` : ``}

      ${openGraph.article.section ? `<meta property="${"article:section"}"${(0, import_index_0a594dbc.b)("content", openGraph.article.section, 0)} data-svelte="svelte-1q8xl96">` : ``}

      ${openGraph.article.authors && openGraph.article.authors.length ? `${(0, import_index_0a594dbc.d)(openGraph.article.authors, (author) => {
    return `<meta property="${"article:author"}"${(0, import_index_0a594dbc.b)("content", author, 0)} data-svelte="svelte-1q8xl96">`;
  })}` : ``}

      ${openGraph.article.tags && openGraph.article.tags.length ? `${(0, import_index_0a594dbc.d)(openGraph.article.tags, (tag) => {
    return `<meta property="${"article:tag"}"${(0, import_index_0a594dbc.b)("content", tag, 0)} data-svelte="svelte-1q8xl96">`;
  })}` : ``}` : ``}

    ${openGraph.images && openGraph.images.length ? `${(0, import_index_0a594dbc.d)(openGraph.images, (image2) => {
    return `<meta property="${"og:image"}"${(0, import_index_0a594dbc.b)("content", image2.url, 0)} data-svelte="svelte-1q8xl96">
        ${image2.alt ? `<meta property="${"og:image:alt"}"${(0, import_index_0a594dbc.b)("content", image2.alt, 0)} data-svelte="svelte-1q8xl96">` : ``}
        ${image2.width ? `<meta property="${"og:image:width"}"${(0, import_index_0a594dbc.b)("content", image2.width.toString(), 0)} data-svelte="svelte-1q8xl96">` : ``}
        ${image2.height ? `<meta property="${"og:image:height"}"${(0, import_index_0a594dbc.b)("content", image2.height.toString(), 0)} data-svelte="svelte-1q8xl96">` : ``}`;
  })}` : ``}` : ``}${twitter ? `<meta name="${"twitter:card"}"${(0, import_index_0a594dbc.b)("content", twitter.card || "summary_large_image", 0)} data-svelte="svelte-1q8xl96">
    ${twitter.site ? `<meta name="${"twitter:site"}"${(0, import_index_0a594dbc.b)("content", twitter.site, 0)} data-svelte="svelte-1q8xl96">` : ``}
    ${twitter.title ? `<meta name="${"twitter:title"}"${(0, import_index_0a594dbc.b)("content", twitter.title, 0)} data-svelte="svelte-1q8xl96">` : ``}
    ${twitter.description ? `<meta name="${"twitter:description"}"${(0, import_index_0a594dbc.b)("content", twitter.description, 0)} data-svelte="svelte-1q8xl96">` : ``}
    ${twitter.image ? `<meta name="${"twitter:image"}"${(0, import_index_0a594dbc.b)("content", twitter.image, 0)} data-svelte="svelte-1q8xl96">` : ``}
     ${twitter.imageAlt ? `<meta name="${"twitter:image:alt"}"${(0, import_index_0a594dbc.b)("content", twitter.imageAlt, 0)} data-svelte="svelte-1q8xl96">` : ``}
    ${twitter.player ? `<meta name="${"twitter:player"}"${(0, import_index_0a594dbc.b)("content", twitter.player, 0)} data-svelte="svelte-1q8xl96">` : ``}
     ${twitter.playerWidth ? `<meta name="${"twitter:player:width"}"${(0, import_index_0a594dbc.b)("content", twitter.playerWidth, 0)} data-svelte="svelte-1q8xl96">` : ``}
    ${twitter.playerHeight ? `<meta name="${"twitter:player:height"}"${(0, import_index_0a594dbc.b)("content", twitter.playerHeight, 0)} data-svelte="svelte-1q8xl96">` : ``}` : ``}${jsonLd ? `<!-- HTML_TAG_START -->${`<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    ...jsonLd
  }) + "<"}/script>`}<!-- HTML_TAG_END -->` : ``}${slots.default ? slots.default({}) : ``}`, ""}`;
});
const title = "CoinSwitch History";
const description = "Explore and download the history and timeseries data of all crypto-INR pairs offered by the CoinSwitch exchange";
const keywords = "coinswitch, cryptocurrency, exchange, india, coinswitch kuber, bitcoin, mihir chaturvedi, plibither8";
const url = "https://cs.mhr.cx";
const image = "https://cs.mhr.cx/logo.png";
const Seo = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_0a594dbc.v)(SvelteSeo, "SvelteSeo").$$render($$result, {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, alt: title }]
    },
    twitter: {
      title,
      description,
      site: url,
      image,
      imageAlt: title
    }
  }, {}, {})}`;
});
const CoinLogo = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 36 36"}" class="${"h-10 w-10"}"><circle fill="${"#F4900C"}" cx="${"18"}" cy="${"19"}" r="${"17"}"></circle><circle fill="${"#FFCC4D"}" cx="${"18"}" cy="${"17"}" r="${"17"}"></circle><circle fill="${"#FFE8B6"}" cx="${"18"}" cy="${"18"}" r="${"14"}"></circle><circle fill="${"#FFAC33"}" cx="${"18"}" cy="${"17"}" r="${"14"}"></circle><path fill="${"#FFE8B6"}" d="${"M9.543 10.856c0-.545.535-.763.535-.763l7.878-3.7 7.953 3.7s.548.122.548.767v.641H9.543v-.645z"}"></path><path fill="${"#F4900C"}" d="${"M25.929 12.836c0-.584-.505-1.057-1.127-1.057H11.129c-.623 0-1.057.473-1.057 1.057 0 .397.204.739.529.92v.666h2.114v-.529h2.114v.529h2.114v-.529h2.114v.529h2.114v-.529h2.114v.529H25.4v-.693c.317-.188.529-.517.529-.893zM27.514 24c0 .438-.355.793-.793.793H9.279c-.438 0-.793-.355-.793-.793 0-.438.355-.793.793-.793h17.443c.437 0 .792.355.792.793z"}"></path><path fill="${"#F4900C"}" d="${"M26.457 12.2c0 .292-.236.529-.529.529H10.071c-.292 0-.529-.237-.529-.529 0-.292.237-.529.529-.529l15.857.003c.293.001.529.234.529.526zm-14.271.614h11.629V14H12.186z"}"></path><path fill="${"#FFD983"}" d="${"M12.714 20.829c0 .584-.316 1.057-.705 1.057h-.705c-.389 0-.705-.473-.705-1.057v-8.014c0-.584.316-1.057.705-1.057h.705c.389 0 .705.473.705 1.057v8.014zm12.686 0c0 .584-.315 1.057-.705 1.057h-.705c-.389 0-.705-.473-.705-1.057v-8.014c0-.584.315-1.057.705-1.057h.705c.389 0 .705.473.705 1.057v8.014zm-8.457 0c0 .584-.316 1.057-.705 1.057h-.705c-.389 0-.705-.473-.705-1.057v-8.014c0-.584.316-1.057.705-1.057h.705c.389 0 .705.473.705 1.057v8.014zm4.228 0c0 .584-.316 1.057-.705 1.057h-.704c-.389 0-.705-.473-.705-1.057v-8.014c0-.584.316-1.057.705-1.057h.704c.389 0 .705.473.705 1.057v8.014z"}"></path><path fill="${"#FFCC4D"}" d="${"M25.929 21.357c0 .584-.473 1.057-1.057 1.057H11.129c-.584 0-1.057-.473-1.057-1.057s.473-1.057 1.057-1.057h13.743c.583 0 1.057.473 1.057 1.057z"}"></path><path fill="${"#FFD983"}" d="${"M26.986 22.414c0 .584-.473 1.057-1.057 1.057H10.071c-.584 0-1.057-.473-1.057-1.057s.473-1.057 1.057-1.057h15.857c.584 0 1.058.473 1.058 1.057z"}"></path><path fill="${"#FFD983"}" d="${"M27.514 23.207c0 .438-.355.793-.793.793H9.279c-.438 0-.793-.355-.793-.793 0-.438.355-.793.793-.793h17.443c.437 0 .792.355.792.793z"}"></path><path fill="${"#FFCC4D"}" d="${"M25.929 12.286c0-.584-.505-1.057-1.127-1.057H11.129c-.623 0-1.057.473-1.057 1.057 0 .397.204.739.529.92v.666h2.114v-.529h2.114v.529h2.114v-.529h2.114v.529h2.114v-.529h2.114v.529H25.4v-.693c.317-.188.529-.517.529-.893z"}"></path><path fill="${"#FFD983"}" d="${"M9.543 11.463c0-.545.535-.763.535-.763L17.956 7l7.953 3.7s.548.122.548.767v.291H9.543v-.295z"}"></path><path fill="${"#FFAC33"}" d="${"M18 8.343s-5.455 2.571-5.999 2.803c-.545.231-.363.611.001.611h11.97c.562 0 .429-.429-.017-.661C23.509 10.865 18 8.343 18 8.343z"}"></path><path fill="${"#FFD983"}" d="${"M26.457 11.757c0 .292-.236.529-.529.529H10.071c-.292 0-.529-.237-.529-.529 0-.292.237-.529.529-.529l15.857.003c.293.001.529.234.529.526z"}"></path></svg>`;
});
const Container = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<section class="${(0, import_index_0a594dbc.e)(className) + " w-full"}"><div class="${"max-w-4xl mx-auto py-10 px-5 space-y-5"}">${slots.default ? slots.default({}) : ``}</div></section>`;
});
const Hero = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, { className: "bg-gray-100 border-b" }, {}, {
    default: () => {
      return `<div class="${"flex items-center space-x-3"}">${(0, import_index_0a594dbc.v)(CoinLogo, "CoinLogo").$$render($$result, {}, {}, {})}
    <h1 class="${"text-2xl font-bold text-gray-900"}">CoinSwitch History</h1></div>
  <p class="${"text-lg text-gray-700 max-w-2xl leading-relaxed"}">Explore and download the history and timeseries data of all crypto-INR pairs
    offered by the CoinSwitch exchange.
  </p>
  <p class="${"italic text-gray-500 max-w-2xl leading-relaxed"}">This project, &quot;CoinSwitch History&quot;, is not affiliated to or endorsed by
    CoinSwitch Kuber.
  </p>`;
    }
  })}`;
});
const ListItem = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `<li class="${"text-gray-700 leading-relaxed list-disc list-inside"}">${slots.default ? slots.default({}) : ``}</li>`;
});
const Ping = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"inline-block mx-1"}"><span class="${"flex h-2 w-2 relative"}"><span class="${"animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400"}"></span>
    <span class="${"relative inline-flex rounded-full h-2 w-2 bg-green-500"}"></span></span></div>`;
});
const Stats = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $externalData, $$unsubscribe_externalData;
  let $updating, $$unsubscribe_updating;
  $$unsubscribe_externalData = (0, import_index_0a594dbc.f)(externalData, (value) => $externalData = value);
  $$unsubscribe_updating = (0, import_index_0a594dbc.f)(updating, (value) => $updating = value);
  const localDate = (date) => new Date(date).toLocaleString();
  let stats;
  ({ stats } = $externalData);
  $$unsubscribe_externalData();
  $$unsubscribe_updating();
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, { className: "bg-gray-50 border-b" }, {}, {
    default: () => {
      return `<h1 class="${"text-lg font-bold text-gray-900"}">Stats</h1>
  ${stats && !$updating ? `<ul class="${"space-y-1"}">${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `Last updated
        ${(0, import_index_0a594dbc.v)(Ping, "Ping").$$render($$result, {}, {}, {})}
        <strong>${(0, import_index_0a594dbc.e)(stats.lastUpdated.relative)}</strong>
        at ${(0, import_index_0a594dbc.e)(localDate(stats.lastUpdated.absolute))}`;
        }
      })}
      ${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `<strong>${(0, import_index_0a594dbc.e)(new Intl.NumberFormat().format(stats.count.time))} times</strong>
        recorded since ${(0, import_index_0a594dbc.e)(localDate(stats.firstTime))}`;
        }
      })}
      ${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `Database filesize is <strong>${(0, import_index_0a594dbc.e)(stats.dbFileSize)}</strong>`;
        }
      })}</ul>` : `<p class="${"text-gray-700 leading-relaxed"}">Loading statistics...</p>`}`;
    }
  })}`;
});
const ChartBar = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "d": "M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" }] } };
const CursorClick = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "fill-rule": "evenodd", "d": "M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z", "clip-rule": "evenodd" }] } };
const Database = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "d": "M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" }, { "d": "M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" }, { "d": "M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" }] } };
const Download = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "fill-rule": "evenodd", "d": "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", "clip-rule": "evenodd" }] } };
const ExternalLink = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "d": "M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" }, { "d": "M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" }] } };
const Refresh = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "fill-rule": "evenodd", "d": "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z", "clip-rule": "evenodd" }] } };
const ViewList = { "default": { "a": { "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor", "aria-hidden": "true" }, "path": [{ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 6h16M4 10h16M4 14h16M4 18h16" }] }, "solid": { "a": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "path": [{ "fill-rule": "evenodd", "d": "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", "clip-rule": "evenodd" }] } };
const Icon = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  var _a;
  let icon;
  let $$restProps = (0, import_index_0a594dbc.g)($$props, ["src", "size", "solid"]);
  let { src } = $$props;
  let { size = "100%" } = $$props;
  let { solid = false } = $$props;
  if (size !== "100%") {
    if (size.slice(-1) != "x" && size.slice(-1) != "m" && size.slice(-1) != "%") {
      try {
        size = parseInt(size) + "px";
      } catch (error) {
        size = "100%";
      }
    }
  }
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  icon = src == null ? void 0 : src[solid ? "solid" : "default"];
  return `<svg${(0, import_index_0a594dbc.h)([
    (0, import_index_0a594dbc.i)(icon == null ? void 0 : icon.a),
    { xmlns: "http://www.w3.org/2000/svg" },
    { width: (0, import_index_0a594dbc.j)(size) },
    { height: (0, import_index_0a594dbc.j)(size) },
    { "aria-hidden": "true" },
    (0, import_index_0a594dbc.i)($$restProps)
  ], {})}>${(0, import_index_0a594dbc.d)((_a = icon == null ? void 0 : icon.path) != null ? _a : [], (a) => {
    return `<path${(0, import_index_0a594dbc.h)([(0, import_index_0a594dbc.i)(a)], {})}></path>`;
  })}</svg>`;
});
const SectionHeading = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let { heading } = $$props;
  let { description: description2 } = $$props;
  let { icon } = $$props;
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0)
    $$bindings.heading(heading);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  return `<div class="${"space-x-6 flex items-center"}">${(0, import_index_0a594dbc.v)(Icon, "Icon").$$render($$result, {
    src: icon,
    size: "22",
    class: "text-gray-600 flex-shrink-0"
  }, {}, {})}
  <div class="${"space-y-1"}"><h1 class="${"text-xl font-bold text-gray-700"}">${(0, import_index_0a594dbc.e)(heading)}</h1>
    <p class="${"text-base text-gray-600 leading-relaxed"}">${(0, import_index_0a594dbc.e)(description2)}</p></div></div>`;
});
const Refresh_1 = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $updating, $$unsubscribe_updating;
  $$unsubscribe_updating = (0, import_index_0a594dbc.f)(updating, (value) => $updating = value);
  $$unsubscribe_updating();
  return `<button class="${"transition border focus:ring-2 ring-gray-200 bg-gray-50 hover:bg-gray-100 rounded p-3 text-gray-700 flex items-center text-sm"}">${(0, import_index_0a594dbc.v)(Icon, "Icon").$$render($$result, {
    src: Refresh,
    size: "16",
    class: "text-gray-700 " + ($updating && "animate-spin"),
    solid: true
  }, {}, {})}</button>`;
});
const CoinSelection = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $externalData, $$unsubscribe_externalData;
  let $selectedCoin, $$unsubscribe_selectedCoin;
  $$unsubscribe_externalData = (0, import_index_0a594dbc.f)(externalData, (value) => $externalData = value);
  $$unsubscribe_selectedCoin = (0, import_index_0a594dbc.f)(selectedCoin, (value) => $selectedCoin = value);
  let coins = [];
  ({ coins } = $externalData);
  $$unsubscribe_externalData();
  $$unsubscribe_selectedCoin();
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, {}, {}, {
    default: () => {
      return `${(0, import_index_0a594dbc.v)(SectionHeading, "SectionHeading").$$render($$result, {
        heading: "Select a coin",
        description: "Choose from the " + coins.length + " coins available on the exchange.",
        icon: CursorClick
      }, {}, {})}
  ${coins.length ? `<div class="${"flex items-center space-x-5"}"><img class="${"h-7 w-7"}" src="${(0, import_index_0a594dbc.e)(API_BASE) + "icons/" + (0, import_index_0a594dbc.e)($selectedCoin) + ".png"}" alt="${""}">
      <select class="${"p-3 rounded bg-gray-50 border text-gray-800 font-bold"}">${(0, import_index_0a594dbc.d)(coins, (coin) => {
        return `<option${(0, import_index_0a594dbc.b)("value", coin.symbol, 0)}>${(0, import_index_0a594dbc.e)(coin.name)}</option>`;
      })}</select>
      ${(0, import_index_0a594dbc.v)(Refresh_1, "Refresh").$$render($$result, {}, {}, {})}</div>` : `<p>Loading coins...</p>`}`;
    }
  })}`;
});
const ChartSettings = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $chartSettings, $$unsubscribe_chartSettings;
  $$unsubscribe_chartSettings = (0, import_index_0a594dbc.f)(chartSettings, (value) => $chartSettings = value);
  $$unsubscribe_chartSettings();
  return `<div class="${"space-y-1 text-sm"}"><div class="${"flex items-baseline space-x-3 overflow-auto py-2"}"><strong class="${"text-gray-500"}">Interval</strong>
    ${(0, import_index_0a594dbc.d)($chartSettings.intervals.values, (interval, i) => {
    return `<button class="${"uppercase font-bold p-1 rounded text-xs " + (0, import_index_0a594dbc.e)($chartSettings.intervals.selected === i ? "ring-2 ring-green-600 text-green-700 bg-green-200" : "text-gray-500 bg-gray-200")}">${(0, import_index_0a594dbc.e)(interval.label)}</button>`;
  })}</div>
  ${``}</div>`;
});
var CoinChart_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.uplot,.uplot *,.uplot :after,.uplot :before{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;width:-webkit-min-content;width:-moz-min-content;width:min-content}.u-title{font-size:18px;font-weight:700;text-align:center}.u-wrap{position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;height:100%;position:relative;width:100%}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{display:inline-block;vertical-align:middle}.u-legend .u-marker{background-clip:content-box!important;height:1em;margin-right:4px;width:1em}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:rgba(0,0,0,.07)}.u-cursor-x,.u-cursor-y,.u-select{pointer-events:none;position:absolute}.u-cursor-x,.u-cursor-y{left:0;top:0;will-change:transform;z-index:100}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{background-clip:content-box!important;border-radius:50%;left:0;pointer-events:none;position:absolute;top:0;will-change:transform;z-index:100}.u-cursor-pt.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-select.u-off{display:none}')();
const css$1 = {
  code: '.uplot,.uplot *,.uplot :after,.uplot :before{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;width:-webkit-min-content;width:-moz-min-content;width:min-content}.u-title{font-size:18px;font-weight:700;text-align:center}.u-wrap{position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;height:100%;position:relative;width:100%}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{display:inline-block;vertical-align:middle}.u-legend .u-marker{background-clip:content-box!important;height:1em;margin-right:4px;width:1em}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:rgba(0,0,0,.07)}.u-cursor-x,.u-cursor-y,.u-select{pointer-events:none;position:absolute}.u-cursor-x,.u-cursor-y{left:0;top:0;will-change:transform;z-index:100}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{background-clip:content-box!important;border-radius:50%;left:0;pointer-events:none;position:absolute;top:0;will-change:transform;z-index:100}.u-cursor-pt.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-select.u-off{display:none}',
  map: null
};
const CoinChart = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $updating, $$unsubscribe_updating;
  let $chartSettings, $$unsubscribe_chartSettings;
  let $externalData, $$unsubscribe_externalData;
  let $selectedCoin, $$unsubscribe_selectedCoin;
  $$unsubscribe_updating = (0, import_index_0a594dbc.f)(updating, (value) => $updating = value);
  $$unsubscribe_chartSettings = (0, import_index_0a594dbc.f)(chartSettings, (value) => $chartSettings = value);
  $$unsubscribe_externalData = (0, import_index_0a594dbc.f)(externalData, (value) => $externalData = value);
  $$unsubscribe_selectedCoin = (0, import_index_0a594dbc.f)(selectedCoin, (value) => $selectedCoin = value);
  const updateHistory = async (symbol) => {
    loadingHistory = true;
    (0, import_index_0a594dbc.k)(externalData, $externalData.history = (await fetcher(`history/${symbol}`)).data, $externalData);
    loadingHistory = false;
  };
  const renderHistoryPlot = async (history) => {
    return;
  };
  let loadingHistory = false;
  $$result.css.add(css$1);
  !$updating && updateHistory($selectedCoin);
  {
    {
      renderHistoryPlot($externalData.history);
      $chartSettings.intervals.selected;
    }
  }
  $$unsubscribe_updating();
  $$unsubscribe_chartSettings();
  $$unsubscribe_externalData();
  $$unsubscribe_selectedCoin();
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, { className: "md:-mb-10" }, {}, {
    default: () => {
      return `${(0, import_index_0a594dbc.v)(SectionHeading, "SectionHeading").$$render($$result, {
        heading: "Explore the charts",
        description: "Hover to see prices, select ranges to zoom in. Charts are optimized for desktop, just btw.",
        icon: ChartBar
      }, {}, {})}
  ${(0, import_index_0a594dbc.v)(ChartSettings, "ChartSettings").$$render($$result, {}, {}, {})}`;
    }
  })}

<section class="${"flex justify-center"}"><div class="${"mx-5 p-5 md:p-10 rounded-lg md:rounded-xl shadow-md md:shadow-lg bg-white max-w-7xl overflow-auto"}">${loadingHistory || $updating ? `<p>Loading history...</p>` : ``}
    <div id="${"plot"}" class="${"flex"}"></div></div>
</section>`;
});
var CoinDownload_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "button.svelte-hologw{align-items:center;border-radius:.25rem;border-width:1px;display:flex;padding:.5rem .75rem;transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}button.svelte-hologw:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}")();
const css = {
  code: "button.svelte-hologw{align-items:center;border-radius:.25rem;border-width:1px;display:flex;padding:.5rem .75rem;transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}button.svelte-hologw:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}",
  map: null
};
const CoinDownload = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_externalData;
  let $selectedCoin, $$unsubscribe_selectedCoin;
  $$unsubscribe_externalData = (0, import_index_0a594dbc.f)(externalData, (value) => value);
  $$unsubscribe_selectedCoin = (0, import_index_0a594dbc.f)(selectedCoin, (value) => $selectedCoin = value);
  $$result.css.add(css);
  $$unsubscribe_externalData();
  $$unsubscribe_selectedCoin();
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, {}, {}, {
    default: () => {
      return `${(0, import_index_0a594dbc.v)(SectionHeading, "SectionHeading").$$render($$result, {
        heading: "Download the data",
        description: "Download the timeseries data for the " + $selectedCoin.toUpperCase() + ".",
        icon: Download
      }, {}, {})}
  <div class="${"flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0"}"><button class="${"space-x-3 ring-green-100 bg-green-50 hover:bg-green-100 hover:border-green-300 border-green-200 text-green-700 svelte-hologw"}">${(0, import_index_0a594dbc.v)(Icon, "Icon").$$render($$result, {
        src: ViewList,
        size: "22",
        class: "text-green-700"
      }, {}, {})}
      <span>Download CSV</span></button>
    <button class="${"space-x-3 ring-yellow-100 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-300 border-yellow-200 text-yellow-700 svelte-hologw"}">${(0, import_index_0a594dbc.v)(Icon, "Icon").$$render($$result, {
        src: Database,
        size: "22",
        class: "text-yellow-700"
      }, {}, {})}
      <span>Download JSON</span></button></div>`;
    }
  })}`;
});
const ApiEndpoint = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let { title: title2 } = $$props;
  let { method } = $$props;
  let { endpoint } = $$props;
  let { description: description2 } = $$props;
  let { exampleResponse = void 0 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.method === void 0 && $$bindings.method && method !== void 0)
    $$bindings.method(method);
  if ($$props.endpoint === void 0 && $$bindings.endpoint && endpoint !== void 0)
    $$bindings.endpoint(endpoint);
  if ($$props.description === void 0 && $$bindings.description && description2 !== void 0)
    $$bindings.description(description2);
  if ($$props.exampleResponse === void 0 && $$bindings.exampleResponse && exampleResponse !== void 0)
    $$bindings.exampleResponse(exampleResponse);
  return `<article class="${"space-y-3"}"><h2 class="${"text-base text-gray-700 font-bold"}">${(0, import_index_0a594dbc.e)(title2)}</h2>
  <div class="${"space-x-3"}"><span class="${"text-xs p-1 rounded bg-green-800 text-white font-bold"}">${(0, import_index_0a594dbc.e)(method)}</span>
    <span class="${"bg-gray-200 p-1 rounded text-sm font-mono"}">${(0, import_index_0a594dbc.e)(endpoint)}</span></div>
  <p class="${"text-sm text-gray-600 leading-normal"}">${(0, import_index_0a594dbc.e)(description2)}</p>
  ${exampleResponse ? `<details class="${"space-y-2"}"><summary class="${"text-sm text-gray-600"}">Example response</summary>
      <pre class="${"text-xs bg-gray-200 rounded p-2 overflow-auto"}">        ${(0, import_index_0a594dbc.e)(JSON.stringify(exampleResponse, null, 2))}
      </pre></details>` : ``}</article>`;
});
const ApiDetails = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  let $externalData, $$unsubscribe_externalData;
  $$unsubscribe_externalData = (0, import_index_0a594dbc.f)(externalData, (value) => $externalData = value);
  var _a, _b;
  let endpoints = [];
  endpoints = [
    {
      title: "Get history of a coin",
      method: "GET",
      endpoint: "/history/:symbol",
      description: `Get the history of a coin, specified by its symbol in lowercase.
        Response is an array of timestamps, buy prices and sell prices, respectively.`,
      exampleResponse: (_a = $externalData.history) === null || _a === void 0 ? void 0 : _a.map((series) => series.slice(0, 5))
    },
    {
      title: "Get list of coins",
      method: "GET",
      endpoint: "/coins",
      description: "Get list of coins available on the exchange and this service.",
      exampleResponse: [
        (_b = $externalData.coins) === null || _b === void 0 ? void 0 : _b[0]
      ]
    },
    {
      title: "Get stats and status of this service and DB",
      method: "GET",
      endpoint: "/status",
      description: "Get statistics and health information regarding the database and its items.",
      exampleResponse: $externalData.stats
    },
    {
      title: "Get coin logos' PNG",
      method: "GET",
      endpoint: "/icons/:symbol.png",
      description: "Get a .PNG file of the coin's logo"
    }
  ];
  $$unsubscribe_externalData();
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, { className: "bg-gray-50 border-t" }, {}, {
    default: () => {
      return `<h1 class="${"text-lg font-bold text-gray-900"}">API</h1>
  <p class="${"leading-normal text-gray-700"}">The API used by this webapp to query coins and history is openly available,
    so long as my VPS has the capacity to cater to its requests. Take note:
  </p>
  <ul class="${"space-y-1"}">${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `<strong>Base URL:</strong> <span>https://api.coinswitch.mihir.ch/</span>`;
        }
      })}
    ${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `No authentication/authorization or API key required.`;
        }
      })}
    ${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `No hard rate limits imposed, please use it sanely. If abused, I&#39;ll have to
      take appropriate actions \u{1F61E}.
    `;
        }
      })}
    ${(0, import_index_0a594dbc.v)(ListItem, "ListItem").$$render($$result, {}, {}, {
        default: () => {
          return `Endpoints and request/response shapes are subject to change without
      warning.
    `;
        }
      })}</ul>

  ${(0, import_index_0a594dbc.d)(endpoints, (endpoint) => {
        return `${(0, import_index_0a594dbc.v)(ApiEndpoint, "ApiEndpoint").$$render($$result, Object.assign(endpoint), {}, {})}`;
      })}`;
    }
  })}`;
});
const About = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_0a594dbc.v)(Container, "Container").$$render($$result, { className: "bg-gray-100 border-t" }, {}, {
    default: () => {
      return `<h1 class="${"text-lg font-bold text-gray-900"}">About this project</h1>
  <p class="${"text-gray-700 leading-relaxed"}">As expected, this was started off as and still is a (better) way to view
    historical price data of crypto-INR pairs offered by CoinSwitch to get a
    better insight (the app has smoothened-out, hard-to-read graphs with
    non-granular intervals).
  </p>
  <p class="${"text-gray-700 leading-relaxed"}">Built by me, <a class="${"underline"}" href="${"https://mihir.ch"}" rel="${"noopener"}" target="${"_blank"}">Mihir Chaturvedi</a> over two boring Sundays. Data is sourced through their internal API calls,
    and updates every five minutes. Powered by uPlot, SvelteKit, Tailwind, Prisma,
    SQLite and seemingly bad code :).
  </p>
  <a class="${"underline text-black flex items-center"}" href="${"https://github.com/plibither8/coinswitch-history"}">View code on GitHub ${(0, import_index_0a594dbc.v)(Icon, "Icon").$$render($$result, {
        src: ExternalLink,
        size: "16",
        class: "ml-1"
      }, {}, {})}</a>`;
    }
  })}`;
});
const Routes = (0, import_index_0a594dbc.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_0a594dbc.v)(Seo, "Seo").$$render($$result, {}, {}, {})}

<header>${(0, import_index_0a594dbc.v)(Hero, "Hero").$$render($$result, {}, {}, {})}</header>

<main>${(0, import_index_0a594dbc.v)(Stats, "Stats").$$render($$result, {}, {}, {})}

  ${(0, import_index_0a594dbc.v)(CoinSelection, "CoinSelection").$$render($$result, {}, {}, {})}

  ${(0, import_index_0a594dbc.v)(CoinChart, "CoinChart").$$render($$result, {}, {}, {})}

  ${(0, import_index_0a594dbc.v)(CoinDownload, "CoinDownload").$$render($$result, {}, {}, {})}

  ${(0, import_index_0a594dbc.v)(ApiDetails, "ApiDetails").$$render($$result, {}, {}, {})}</main>

<footer>${(0, import_index_0a594dbc.v)(About, "About").$$render($$result, {}, {}, {})}</footer>`;
});
