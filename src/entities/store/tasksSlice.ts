import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Task } from '../tasks';
import { fetchTasks, createTaskApi, updateTaskApi, deleteTaskApi } from '../api/tasksApi';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasksThunk = createAsyncThunk('tasks/fetch', async () => {
  return await fetchTasks();
});

export const createTaskThunk = createAsyncThunk('tasks/create', async (task: Omit<Task, 'id'>) => {
  return await createTaskApi(task);
});

export const updateTaskThunk = createAsyncThunk('tasks/update', 
  async ({ id, updatedTask }: { id: string, updatedTask: Partial<Task> }) => {
    return await updateTaskApi(id, updatedTask);
});

export const deleteTaskThunk = createAsyncThunk('tasks/delete', async (id: string) => {
  await deleteTaskApi(id);
  return id;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузка задач
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Создание задачи
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      
      // Обновление задачи
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      
      // Удаление задачи
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;