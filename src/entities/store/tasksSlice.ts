import { createSlice, type PayloadAction, nanoid } from '@reduxjs/toolkit';
import { type Task } from '../tasks';
import { loadTasks, uploadTasks } from '../utils/storage';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: loadTasks(),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        uploadTasks(state.tasks);
      },
      prepare: (task: Omit<Task, 'id'>) => {
        return {
          payload: {
            ...task,
            id: nanoid(),
          },
        };
      },
    },
    
    updateTask: (state, action: PayloadAction<{id: number | string, updatedTask: Partial<Task>}>) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
        uploadTasks(state.tasks);
      }
    },
    
    deleteTask: (state, action: PayloadAction<number | string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      uploadTasks(state.tasks);
    },
    
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      uploadTasks(state.tasks);
    },
  },
});

export const { createTask, updateTask, deleteTask, setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;