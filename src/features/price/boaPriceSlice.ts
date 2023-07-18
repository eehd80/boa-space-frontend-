import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CoinGeckoClient } from "coingecko-api-v3-axios";
import { useSelector } from "react-redux";
import { usdFormat } from "../../utils/Format";
import { formatEther } from "@ethersproject/units";
import _ from "lodash";

export interface BoaPriceSlice {
  usd: number;
  last_updated_at: number;
}

export interface BOAState {
  boa: BoaPriceSlice;
}

const initialState: BOAState = {
  boa: { usd: undefined, last_updated_at: undefined },
};

const client = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

export const fetchBOAPrice = createAsyncThunk("price/fetch", async () => {
  return await client.simplePrice({
    ids: "bosagora",
    vs_currencies: "usd",
    include_market_cap: false,
    include_24hr_vol: false,
    include_24hr_change: false,
    include_last_updated_at: true,
  });
});

export const BOAPriceSlice = createSlice({
  name: "boaPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBOAPrice.fulfilled, (state, action) => {
      state.boa.usd = action.payload.bosagora.usd;
      state.boa.last_updated_at = action.payload.bosagora.last_updated_at;
    });
  },
});

export const useBOAPrice = () => {
  return useSelector((state: RootState) => state.boaPrice.boa.usd);
};

export const getBOAUSDPrice = (boa: string, usd: number): string => {
  if (usd && boa) {
    try {
      const boaNum = _.toNumber(boa) * usd;
      return `$${boaNum.toFixed(2)}`;
    } catch (e) {
      return "$-.--";
    }
  }
  return "$-.--";
};
export const getUSDPrice = (boa: string, usd: number): string => {
  if (usd && boa) {
    try {
      return usdFormat.format(parseFloat(formatEther(boa)) * usd);
    } catch (e) {
      return "$-.--";
    }
  }
  return "$-.--";
};

export default BOAPriceSlice.reducer;
