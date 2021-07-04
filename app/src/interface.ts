export interface Coin {
  id: number;
  symbol: string;
  name: string;
}

export interface History {
  id: number;
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  timeId: number;
  time: {
    id: number;
    time: string;
  };
}
