import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { loadTasks } from '../utils/storage';

const preloadedState = {
  tasks: {
    tasks: loadTasks()
  }
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;