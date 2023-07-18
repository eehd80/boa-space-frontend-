import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { ViewMode } from "../../components/My/GrideAlign";
import { addDays } from "date-fns";

export interface OptionState {
  isFilterCollected: boolean;
  isFilterCreated: boolean;
  isFilterActivity: boolean;
  isFilterCollection: boolean;
  isFilterSearch: boolean;
  isViewModeCollected: ViewMode;
  isViewModeCreated: ViewMode;
  isViewModeCollection: ViewMode;
  isViewModeSearch: ViewMode;
  expiredIntroVideoTime: number;
}

const initialState: OptionState = {
  isFilterCollected: false,
  isFilterCreated: false,
  isFilterActivity: false,
  isFilterCollection: false,
  isFilterSearch: false,
  isViewModeCollected: ViewMode.GRID,
  isViewModeCreated: ViewMode.GRID,
  isViewModeCollection: ViewMode.GRID,
  isViewModeSearch: ViewMode.GRID,
  expiredIntroVideoTime: NaN,
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    setFilterCollected: (state, action: PayloadAction<any>) => {
      state.isFilterCollected = action.payload;
    },
    setFilterCreated: (state, action: PayloadAction<any>) => {
      state.isFilterCreated = action.payload;
    },
    setFilterActivity: (state, action: PayloadAction<any>) => {
      state.isFilterActivity = action.payload;
    },
    setFilterCollection: (state, action: PayloadAction<any>) => {
      state.isFilterCollection = action.payload;
    },
    setFilterSearch: (state, action: PayloadAction<any>) => {
      state.isFilterSearch = action.payload;
    },
    setViewModeCollected: (state, action: PayloadAction<ViewMode>) => {
      state.isViewModeCollected = action.payload;
    },
    setViewModeCreated: (state, action: PayloadAction<ViewMode>) => {
      state.isViewModeCreated = action.payload;
    },
    setViewModeCollection: (state, action: PayloadAction<ViewMode>) => {
      state.isViewModeCollection = action.payload;
    },
    setViewModeSearch: (state, action: PayloadAction<ViewMode>) => {
      state.isViewModeSearch = action.payload;
    },
    setIntroVideoTime: (state, action: PayloadAction<number>) => {
      state.expiredIntroVideoTime = action.payload;
    },
  },
});

export const {
  setFilterCollected,
  setFilterCreated,
  setFilterActivity,
  setFilterCollection,
  setFilterSearch,
  setViewModeCollected,
  setViewModeCreated,
  setViewModeCollection,
  setViewModeSearch,
  setIntroVideoTime,
} = optionSlice.actions;

export const useOptionState = () => {
  return useSelector((state: RootState) => state.option);
};
export const useExpiredIntroVideoTime = () => {
  const time = useSelector((state: RootState) => state.option.expiredIntroVideoTime);
  if (isNaN(time)) return true;
  const day = addDays(time, 1);
  return day.getTime() < Date.now();
};

export default optionSlice.reducer;
