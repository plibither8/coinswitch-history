import { writable } from "svelte/store";
import { DEFAULT_SELECTED_COIN } from "./constants";
import type { Coin, History } from "./interface";

export const selectedCoin = writable<string>(DEFAULT_SELECTED_COIN);

export const externalData = writable<{
  history: History[];
  coins: Coin[];
  stats: any;
}>({
  history: [],
  coins: [],
  stats: {},
});
