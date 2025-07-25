import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Pages/Auth/authSlice';

/**
 * The main Redux store for the application.
 * It combines all the different feature slices into a single state tree.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
