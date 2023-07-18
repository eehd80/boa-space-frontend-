import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

export interface FavoriteState {
  list: any[];
  updateTime: number;
}

const initialState: FavoriteState = {
  list: [],
  updateTime: NaN,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    changeFavorite: (state, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.updateTime = Date.now();
    },
  },
});

export const { changeFavorite } = favoriteSlice.actions;

export const useFavoriteList = () => {
  return useSelector((state: RootState) => state.favorite.list);
};
export const useFavoriteUpdateTime = () => {
  return useSelector((state: RootState) => state.favorite.updateTime);
};
export const useFavoriteCount = () => {
  return useSelector((state: RootState) => state.favorite.list?.length);
};

export const getFavorite = (state: RootState, id: string): boolean => {
  if (id) {
    const assets = state.favorite.list?.find((v: any) => v.id === id);
    return assets ? true : false;
  }
  return false;
};

export default favoriteSlice.reducer;
