import type { Task } from "../tasks";

const currentDate = new Date().toISOString().split('T')[0]

export const mockTasks: Task[] = [
    {
      id: '1',
      name: 'UI Bug',
      description: 'some ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bugsome ui bug',
      tag: 'Bug',
      status: 'Done',
      priority: 'High',
      date: currentDate
  },
  {
      id: '2',
      name: 'New Button',
      description: 'Need to add new button',
      tag: 'Feature',
      status: 'To Do',
      priority: 'Medium',
      date: currentDate
  },
  {
      id: '3',
      name: 'Documentation for class',
      description: 'write doc for new class',
      tag: 'Documentation',
      status: 'In Progress',
      priority: 'Low',
      date: currentDate
  },
  {
      id: '4',
      name: "Refactor jun's code",
      description: 'refactor class',
      tag: 'Refactor',
      status: 'To Do',
      priority: 'Medium',
      date: currentDate
  },
  {
      id: '5',
      name: 'Test UI',
      description: 'Need to test UI',
      tag: 'Test',
      status: 'In Progress',
      priority: 'High',
      date: currentDate
  },
  {
      id: '6',
      name: 'UI Bug',
      description: 'some ui bug',
      tag: 'Bug',
      status: 'Done',
      priority: 'High',
      date: currentDate
  },
  {
      id: '7',
      name: 'New Button',
      description: 'Need to add new button',
      tag: 'Feature',
      status: 'To Do',
      priority: 'Medium',
      date: currentDate
  },
  {
      id: '8',
      name: 'Documentation for class',
      description: 'write doc for new class',
      tag: 'Documentation',
      status: 'In Progress',
      priority: 'Low',
      date: currentDate
  },
  {
      id: '9',
      name: "Refactor jun's code",
      description: 'refactor class',
      tag: 'Refactor',
      status: 'To Do',
      priority: 'Medium',
      date: currentDate
  },
  {
      id: '10',
      name: 'Test UI',
      description: 'Need to test UI',
      tag: 'Test',
      status: 'In Progress',
      priority: 'High',
      date:currentDate
  },{
      id: '11',
      name: 'UI Bug',
      description: 'some ui bug',
      tag: 'Bug',
      status: 'Done',
      priority: 'High',
      date: currentDate
  },
  {
      id: '12',
      name: 'New Button',
      description: 'Need to add new button',
      tag: 'Feature',
      status: 'To Do',
      priority: 'Medium',
      date: currentDate
  },
  {
      id: '13',
      name: 'Documentation for class',
      description: 'write doc for new class',
      tag: 'Documentation',
      status: 'In Progress',
      priority: 'Low',
      date: currentDate
  },
  {
      id: '14',
      name: "Refactor jun's code",
      description: 'refactor class',
      tag: 'Refactor',
      status: 'To Do',
      priority: 'Medium',
      date: currentDate
  },
  {
      id: '15',
      name: 'Test UI',
      description: 'Need to test UI',
      tag: 'Test',
      status: 'In Progress',
      priority: 'High',
      date: currentDate
  }
]