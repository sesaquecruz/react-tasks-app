import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { tasksApiSlice } from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tasksApiSlice.reducerPath]: tasksApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
