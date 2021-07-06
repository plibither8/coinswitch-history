import { Coin, History } from "@prisma/client";

export interface CsCoin {
  id: number;
  name: string;
  symbol: string;
  confirmation_count: number;
  address_regex: string;
  logo: string;
  deposit_enabled: boolean;
  withdraw_enabled: boolean;
  trade_enabled: boolean;
  is_delisted?: any;
  precision: number;
  withdraw_precision: number;
  trade_precision: number;
  rate_inr_precision?: any;
  withdrawal_fee: number;
  min_withdrawable_amount: number;
  max_withdrawable_amount: number;
  min_deposit_amount?: any;
  max_deposit_amount?: any;
  default_deposit_amount: number;
  default_withdrawal_amount: number;
  change_24h?: any;
  coin_address_additional_data: any;
  weight: number;
  blockset_currency_id?: any;
  contract_address?: any;
  orders_config?: any;
  additional_data: any[];
  cmc_coin: any[];
}

export interface CsBalance {
  coin: CsCoin;
  blocked_balance_deposit: number;
  blocked_balance_withdraw: number;
  blocked_balance_orders: number;
  main_balance: number;
  "24hChange": number;
  inr_value: number;
  sell_price: number;
  blocked_balance_orders_inr_value: number;
  "24hHigh": number;
  "24hLow": number;
  historical: number[];
  rate_inr: number;
}

export interface CleanCsResponse {
  coin: {
    name: string;
    symbol: string;
    iconUrl: string;
  };
  buyPrice: History["buyPrice"];
  sellPrice: History["sellPrice"];
}
