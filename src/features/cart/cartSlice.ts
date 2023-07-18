import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useEthers } from "@usedapp/core";
import { useMemo } from "react";

export interface CartItem {
  account: string;
  asset: any;
  orderData: any;
}

export interface CartList {
  list: CartItem[];
}

const initialState: CartList = {
  list: [],
};

export interface CartRemovePayload {
  account?: string;
  orderId: string;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const list = state.list.filter((i: CartItem) => i.account === action.payload.account);
      const idx = list.findIndex((v) => v.orderData.id === action.payload.orderData.id);
      if (idx === -1) {
        state.list.push(action.payload);
      }
    },
    removeCart: (state, action: PayloadAction<CartRemovePayload>) => {
      if (action.payload?.account) {
        const idx = state.list.findIndex(
          (v) => v.orderData.id === action.payload.orderId && v.account === action.payload.account
        );
        if (idx > -1) {
          state.list.splice(idx, 1);
        }
      } else {
        const l = state.list.filter((v) => v.orderData.id !== action.payload);
        state.list = [...l];
      }
    },
    clearCart: (state, action: PayloadAction<string>) => {
      state.list = [...state.list.filter((i) => i.account !== action.payload)];
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;

export const useCartList = () => {
  const { account } = useEthers();
  const cartItemsData = useSelector((state: RootState) => state.cart.list);
  const { items, totalCount } = useMemo(() => {
    if (cartItemsData && cartItemsData.length > 0) {
      return {
        items: cartItemsData.filter((i) => i.account === account),
        totalCount: cartItemsData.length,
      };
    }
    return { items: [], totalCount: 0 };
  }, [account, cartItemsData]);
  return { items, totalCount };
};
export const useCartCount = () => {
  return useCartList().totalCount;
};

export default cartSlice.reducer;
