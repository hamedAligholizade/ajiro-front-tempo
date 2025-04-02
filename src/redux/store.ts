import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Additional reducers will be added here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these paths in the state
      ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
      ignoredActionPaths: ['payload.user', 'payload.tokens'],
      ignoredPaths: ['auth.user'],
    },
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 