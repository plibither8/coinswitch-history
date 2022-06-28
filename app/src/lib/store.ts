import { writable } from "svelte/store";
import { DEFAULT_SELECTED_COIN } from "./constants";
import api from "./api";
import type { ApiResponse } from "./api"
import type { Coin, History, Stats } from "./interface";
import { get_store_value as get } from "svelte/internal";

export const selectedCoin = writable<string>(DEFAULT_SELECTED_COIN);

export const externalData = writable<{
  history: History;
  coins: Coin[];
  stats: Stats | undefined;
}>({
  history: [[], [], []],
  coins: [],
  stats: undefined,
});

export const updating = writable<boolean>(false);

export const updateData = async () => {
  updating.set(true);
  let data: ApiResponse[] = [];
  do {
    data = await Promise.all([
      api<Coin[]>("coins"),
      api<History>(`history/${get(selectedCoin)}`),
      api<any>("status"),
    ]);
  } while (!data[0]);
  updating.set(false);

  externalData.set({
    coins: data[0].data,
    history: data[1].data,
    stats: data[2].data,
  });
};

export const chartSettings = writable({
  intervals: {
    selected: 0,
    values: [
      {
        label: "5min",
        mod5: 1,
      },
      {
        label: "10min",
        mod5: 2,
      },
      {
        label: "30min",
        mod5: 6,
      },
      {
        label: "1h",
        mod5: 12,
      },
      {
        label: "3h",
        mod5: 36,
      },
      {
        label: "6h",
        mod5: 72,
      },
      {
        label: "1d",
        mod5: 288,
      },
    ],
  },
  ranges: {
    selected: 0,
    values: ["1d", "3d", "1w", "1M"],
  },
});
