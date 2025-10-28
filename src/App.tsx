import { useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import { KanbanColumn, KanbanTask } from './components/KanbanBoard/KanbanBoard.types';
import { LandingPage } from './components/LandingPage';

const initialColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: ['task-1', 'task-2', 'task-3'] },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-4', 'task-5'], maxTasks: 5 },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: ['task-6'] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-7', 'task-8'] },
];

const initialTasks: Record<string, KanbanTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Design new landing page',
    description: 'Create mockups for the new landing page with updated branding',
    status: 'todo',
    priority: 'high',
    assignee: 'Sarah Johnson',
    tags: ['design', 'ui'],
    createdAt: new Date('2024-01-15'),
    dueDate: new Date('2025-02-01'),
  },
  'task-2': {
    id: 'task-2',
    title: 'Update API documentation',
    description: 'Add examples for new endpoints',
    status: 'todo',
    priority: 'medium',
    assignee: 'Mike Chen',
    tags: ['documentation', 'api'],
    createdAt: new Date('2024-01-16'),
  },
  'task-3': {
    id: 'task-3',
    title: 'Fix responsive layout issues',
    status: 'todo',
    priority: 'urgent',
    assignee: 'Emma Wilson',
    tags: ['bug', 'css'],
    createdAt: new Date('2024-01-17'),
    dueDate: new Date('2024-01-20'),
  },
  'task-4': {
    id: 'task-4',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication with refresh tokens',
    status: 'in-progress',
    priority: 'high',
    assignee: 'David Lee',
    tags: ['backend', 'security'],
    createdAt: new Date('2024-01-10'),
    dueDate: new Date('2025-01-30'),
  },
  'task-5': {
    id: 'task-5',
    title: 'Create dashboard widgets',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Sarah Johnson',
    tags: ['frontend', 'react'],
    createdAt: new Date('2024-01-12'),
  },
  'task-6': {
    id: 'task-6',
    title: 'Review pull request #234',
    description: 'Code review for new feature implementation',
    status: 'review',
    priority: 'high',
    assignee: 'Mike Chen',
    tags: ['review'],
    createdAt: new Date('2024-01-14'),
  },
  'task-7': {
    id: 'task-7',
    title: 'Deploy to staging',
    status: 'done',
    priority: 'low',
    assignee: 'Emma Wilson',
    tags: ['devops', 'deployment'],
    createdAt: new Date('2024-01-05'),
    dueDate: new Date('2024-01-18'),
  },
  'task-8': {
    id: 'task-8',
    title: 'Update dependencies',
    description: 'Update npm packages to latest versions',
    status: 'done',
    priority: 'low',
    assignee: 'David Lee',
    tags: ['maintenance'],
    createdAt: new Date('2024-01-08'),
  },
};

function App() {
  const [showDemo, setShowDemo] = useState(false);
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);

  const handleTaskMove = (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((col) => {
        if (col.id === fromColumn) {
          return {
            ...col,
            taskIds: col.taskIds.filter((id) => id !== taskId),
          };
        }
        if (col.id === toColumn) {
          const newTaskIds = [...col.taskIds];
          newTaskIds.splice(newIndex, 0, taskId);
          return { ...col, taskIds: newTaskIds };
        }
        return col;
      });
      return updatedColumns;
    });

    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskId]: { ...prevTasks[taskId], status: toColumn },
    }));
  };

  const handleTaskCreate = (columnId: string, task: KanbanTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [task.id]: task,
    }));

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, taskIds: [...col.taskIds, task.id] } : col
      )
    );
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<KanbanTask>) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskId]: { ...prevTasks[taskId], ...updates },
    }));
  };

  const handleTaskDelete = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => id !== taskId),
      }))
    );

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      delete newTasks[taskId];
      return newTasks;
    });
  };

  if (!showDemo && window.location.pathname === '/') {
    return (
      <div onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A') {
          const href = target.getAttribute('href');
          if (href === '/demo') {
            e.preventDefault();
            setShowDemo(true);
            window.history.pushState({}, '', '/demo');
          }
        }
      }}>
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-neutral-100">
      <div className="h-full flex flex-col">
        <header className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Kanban Board</h1>
              <p className="text-sm text-neutral-600">Drag and drop tasks between columns to manage your workflow</p>
            </div>
            <button
              onClick={() => {
                setShowDemo(false);
                window.history.pushState({}, '', '/');
              }}
              className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <KanbanBoard
            columns={columns}
            tasks={tasks}
            onTaskMove={handleTaskMove}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
