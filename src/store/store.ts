import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './booksSlice'

const reducer = {
  books: bookReducer
}

export const store = configureStore({reducer});

export const getStoreWithState = (preloadedState?: RootState) => {
  return configureStore({ reducer, preloadedState})
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch