import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import _ from "lodash";

export enum OrderType {
  LISTING_FULFILL,
  OFFERING_FULFILL,
  CANCEL,
}
export interface OrderItem {
  orderId: string;
  asset: any;
  orderData: any;
  transactionHash: string;
  orderType: OrderType;
  blockNumber?: number;
}
export interface OrdersState {
  orders: OrderItem[];
  blockNumber: number;
}
const initialState: OrdersState = {
  orders: [],
  blockNumber: NaN,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrder: (state, action: PayloadAction<OrderItem>) => {
      const bn = state.blockNumber;
      const found = _.find(state.orders, (o) => o.orderId === action.payload.orderId);
      if (!found) state.orders.push({ ...action.payload, blockNumber: bn });
    },
    saveOrders: (state, action: PayloadAction<OrderItem[]>) => {
      const bn = state.blockNumber;
      action.payload?.forEach((od: OrderItem) => {
        const found = _.find(state.orders, (o) => o.orderId === od.orderId);
        if (!found) state.orders.push({ ...od, blockNumber: bn });
      });
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = _.remove(state.orders, (o) => {
        o.orderId === action.payload;
      });
    },
    updateBlockNumber: (state, action: PayloadAction<number>) => {
      state.blockNumber = action.payload;
    },
  },
});

export const { saveOrder, deleteOrder, updateBlockNumber, saveOrders } = orderSlice.actions;

export const useRemainingOrders = () => {
  return useSelector((state: RootState) => state.order.orders);
};

export default orderSlice.reducer;
