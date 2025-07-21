import { createContext, useContext, useState, type ReactNode } from "react";
import { type Task } from "../pages/tasks";

interface TaskContextType { 
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    updateTask: (id: number, updatedTask: Partial<Task>) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const initialTasks: Task[] = [
    {
        id: 1,
        name: 'UI Bug',
        description: 'some ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bug',
        tag: 'Bug',
        status: 'Done',
        priority: 'High'
    },
    {
        id: 2,
        name: 'New Button',
        description: 'Need to add new button',
        tag: 'Feature',
        status: 'To Do',
        priority: 'Medium'
    },
    {
        id: 3,
        name: 'Documentation for class',
        description: 'write doc for new class',
        tag: 'Documentation',
        status: 'In Progress',
        priority: 'Low'
    },
    {
        id: 4,
        name: "Refactor jun's code",
        description: 'refactor class',
        tag: 'Refactor',
        status: 'To Do',
        priority: 'Medium'
    },
    {
        id: 5,
        name: 'Test UI',
        description: 'Need to test UI',
        tag: 'Test',
        status: 'In Progress',
        priority: 'High'
    },
    {
        id: 6,
        name: 'UI Bug',
        description: 'some ui bug',
        tag: 'Bug',
        status: 'Done',
        priority: 'High'
    },
    {
        id: 7,
        name: 'New Button',
        description: 'Need to add new button',
        tag: 'Feature',
        status: 'To Do',
        priority: 'Medium'
    },
    {
        id: 8,
        name: 'Documentation for class',
        description: 'write doc for new class',
        tag: 'Documentation',
        status: 'In Progress',
        priority: 'Low'
    },
    {
        id: 9,
        name: "Refactor jun's code",
        description: 'refactor class',
        tag: 'Refactor',
        status: 'To Do',
        priority: 'Medium'
    },
    {
        id: 10,
        name: 'Test UI',
        description: 'Need to test UI',
        tag: 'Test',
        status: 'In Progress',
        priority: 'High'
    },{
        id: 11,
        name: 'UI Bug',
        description: 'some ui bug',
        tag: 'Bug',
        status: 'Done',
        priority: 'High'
    },
    {
        id: 12,
        name: 'New Button',
        description: 'Need to add new button',
        tag: 'Feature',
        status: 'To Do',
        priority: 'Medium'
    },
    {
        id: 13,
        name: 'Documentation for class',
        description: 'write doc for new class',
        tag: 'Documentation',
        status: 'In Progress',
        priority: 'Low'
    },
    {
        id: 14,
        name: "Refactor jun's code",
        description: 'refactor class',
        tag: 'Refactor',
        status: 'To Do',
        priority: 'Medium'
    },
    {
        id: 15,
        name: 'Test UI',
        description: 'Need to test UI',
        tag: 'Test',
        status: 'In Progress',
        priority: 'High'
    }
]

export const TaskProvider = ({ children }: { children: ReactNode }) => { 
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    const updateTask = (id: number, updatedTask: Partial<Task>) => { 
        setTasks(prev => 
            prev.map(task => (task.id === id ? {...task, ...updatedTask} : task))
        )
        console.log('Task has been updated', updatedTask)
    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = (): TaskContextType => { 
    const context = useContext(TaskContext)
    if (!context) throw new Error("useTask must be used with TaskProvider")
    return context
}