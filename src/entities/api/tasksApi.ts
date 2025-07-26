import type { Task } from '@entities/tasks';
import { nanoid } from '@reduxjs/toolkit';
import { mockTasks } from '@mocks';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

let tasks: Task[] = mockTasks;

export const fetchTasks = async (): Promise<Task[]> => {
  await delay();
  return tasks;
};

export const createTaskApi = async (task: Omit<Task, 'id'>): Promise<Task> => {
  await delay();
  const newTask = { ...task, id: nanoid() };
  tasks = [...tasks, newTask];
  return newTask;
};

export const updateTaskApi = async (id: string, updatedTask: Partial<Task>): Promise<Task> => {
  await delay();
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) throw new Error('Task not found');
  tasks[index] = { ...tasks[index], ...updatedTask };
  return tasks[index];
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await delay();
  tasks = tasks.filter(task => task.id !== id);
};