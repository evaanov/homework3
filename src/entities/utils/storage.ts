import type { Task } from "../tasks"
import { mockTasks } from "./mocks";

const TASK_KEY = 'tasks'

export const initializeTasks = () => {
    if (!localStorage.getItem(TASK_KEY) && typeof window !== 'undefined') {
      localStorage.setItem(TASK_KEY, JSON.stringify(mockTasks));
    }
  };

initializeTasks()

export const loadTasks = (): Task[] => { 
    try {
        const tasks = localStorage.getItem(TASK_KEY)
        return tasks ? JSON.parse(tasks) : []
    } catch(e) { 
        console.error('failed to load tasks', e)
        return []
    }
}


export const uploadTasks = (tasks: Task[]): void => { 
    try {
        localStorage.setItem(TASK_KEY, JSON.stringify(tasks))
    } catch(e) { 
        console.error('failed to upload tasks', e)
    }
}