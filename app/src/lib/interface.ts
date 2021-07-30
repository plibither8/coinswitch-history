export interface Coin {
  id: number;
  symbol: string;
  name: string;
}

export type History = [number[], number[], number[]];

export interface Stats {
  dbFileSize: string;
  firstTime: string;
  lastUpdated: {
    relative: string;
    absolute: string;
  };
  count: {
    coin: number;
    history: number;
    time: number;
  };
}
