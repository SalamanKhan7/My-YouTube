import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterVideos: [],
  },
  reducers: {
    filterVideo: (state, action) => {
      state.filterVideos.length = 0;
      console.log(state.filterVideos);
      console.log(action.payload);

      state.filterVideos.push(...action.payload);
    },
  },
});

export const { filterVideo } = filterSlice.actions;
export default filterSlice.reducer;
