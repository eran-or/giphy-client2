import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import giphyReducer from '../features/search-giphy/searchGiphySlice';

export const store = configureStore({
  reducer: {
    searchGiphy: giphyReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
