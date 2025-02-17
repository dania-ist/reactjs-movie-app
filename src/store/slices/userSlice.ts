import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types/movie";

interface initialState {
  favorite: Array<Movie>;
  watchlistState: Array<Movie>;
}
const initialState: initialState = {
  favorite: [],
  watchlistState: [],
};

export const userSlice = createSlice({
  name: "operationNotification",
  initialState,
  reducers: {
    setFavoritState: (state, action: PayloadAction<Array<Movie>>) => {
      state.favorite = action.payload;
    },
    setWatchListState: (state, action: PayloadAction<Array<Movie>>) => {
      state.watchlistState = action.payload;
    },
    addToUserFavorite: (state, action: PayloadAction<Movie>) => {
      console.log("ff");
      state.favorite = [...state.favorite, action.payload];
    },
    addToUserWatchList: (state, action: PayloadAction<Movie>) => {
      console.log("ll");
      state.watchlistState = [...state.watchlistState, action.payload];
    },
    removeFromUserFavorite: (state, action: PayloadAction<Movie>) => {
      state.favorite = [];
      // state.favorite=[...state.favorite,action.payload]
    },
    removeFromUserWatchList: (state, action: PayloadAction<Movie>) => {
      state.watchlistState = [];
      // state.favorite=[...state.favorite,action.payload]
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
export const {
  addToUserFavorite,
  addToUserWatchList,
  removeFromUserFavorite,
  removeFromUserWatchList,
  setFavoritState,
  setWatchListState,
} = userSlice.actions;
