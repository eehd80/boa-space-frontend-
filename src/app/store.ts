import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import boaReducer from "../features/price/boaPriceSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";
import cartReducer from "../features/cart/cartSlice";
import assetReducer from "../features/asset/assetsSlice";
import optionReducer from "../features/utils/optionSlice";
import orderReducer from "../features/order/orderSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  favorite: favoriteReducer,
  boaPrice: boaReducer,
  cart: cartReducer,
  assets: assetReducer,
  option: optionReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  version: 4,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
