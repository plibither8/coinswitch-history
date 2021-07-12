import { writable } from "svelte/store";
import { DEFAULT_SELECTED_COIN } from "./constants";
import api, { ApiResponse } from "./api";
import type { Coin, History, Stats } from "./interface";
import { get_store_value as get } from "svelte/internal";

export const selectedCoin = writable<string>(DEFAULT_SELECTED_COIN);

export const externalData = writable<{
  history: History[];
  coins: Coin[];
  stats: Stats | undefined;
}>({
  history: [],
  coins: [],
  stats: undefined,
});

export const refreshing = writable<boolean>(false);

export const updateData = async () => {
  refreshing.set(true);
  let data: ApiResponse[] = [];
  do {
    data = await Promise.all([
      api<Coin[]>("coins"),
      api<History[]>(`history/${get(selectedCoin)}`),
      api<any>("status"),
    ]);
  } while (!data[0]);
  refreshing.set(false);

  externalData.set({
    coins: data[0].data,
    history: data[1].data,
    stats: data[2].data,
  });
};
