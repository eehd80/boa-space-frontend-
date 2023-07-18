import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

export interface AssetsState {
  collectedCount: number;
  createdCount: number;
  updateTime: number;
}

const initialState: AssetsState = {
  collectedCount: 0,
  createdCount: 0,
  updateTime: NaN,
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    changeCollectedCount: (state, action: PayloadAction<any>) => {
      state.collectedCount = action.payload;
      state.updateTime = new Date().getTime();
    },
    changeCreatedCount: (state, action: PayloadAction<any>) => {
      state.createdCount = action.payload;
    },
  },
});

export const { changeCollectedCount, changeCreatedCount } = assetsSlice.actions;

export const useCollectedCount = () => {
  return useSelector((state: RootState) => state.assets.collectedCount);
};
export const useCreatedCount = () => {
  return useSelector((state: RootState) => state.assets.createdCount);
};
export const useUpdateTime = () => {
  return useSelector((state: RootState) => state.assets.updateTime);
};

export default assetsSlice.reducer;
