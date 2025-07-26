import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '@store/store';
import { useCallback } from 'react';
import { 
  fetchTasksThunk, 
  createTaskThunk, 
  updateTaskThunk, 
  deleteTaskThunk 
} from '@store/tasksSlice';
import type { Task } from '../tasks';

export const useTasks = () => {
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const fetchTasks = useCallback(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  const handleCreateTask = useCallback((task: Omit<Task, 'id'>) => {
    return dispatch(createTaskThunk(task));
  }, [dispatch]);

  const handleUpdateTask = useCallback((id: string, updatedTask: Partial<Task>) => {
    return dispatch(updateTaskThunk({ id, updatedTask }));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: string) => {
    return dispatch(deleteTaskThunk(id));
  }, [dispatch]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
  };
};