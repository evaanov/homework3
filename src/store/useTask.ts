import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from './store';
import { useCallback } from 'react';
import { createTask, updateTask, deleteTask } from './tasksSlice';
import type { Task } from '../pages/tasks';


export const useTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateTask = useCallback((task: Omit<Task, 'id'>) => {
    dispatch(createTask(task));
  }, [dispatch]);

  const handleUpdateTask = useCallback((id: number | string, updatedTask: Partial<Task>) => {
    dispatch(updateTask({ id, updatedTask }));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: number | string) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  return {
    tasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
  };
};