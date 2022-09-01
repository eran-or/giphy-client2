import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import giphyReducer from '../features/search-giphy/searchGiphySlice';
// import 

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
