import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KanbanBoard } from './KanbanBoard';
import { KanbanColumn, KanbanTask, KanbanViewProps } from './KanbanBoard.types';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

const KanbanWrapper = (props: KanbanViewProps) => {
  const [columns, setColumns] = useState(props.columns);
  const [tasks, setTasks] = useState(props.tasks);

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

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onTaskMove={handleTaskMove}
        onTaskCreate={handleTaskCreate}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

const defaultColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: ['task-1', 'task-2', 'task-3'] },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-4', 'task-5'] },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: ['task-6'] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-7', 'task-8'] },
];

const defaultTasks: Record<string, KanbanTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Design new landing page',
    description: 'Create mockups for the new landing page with updated branding',
    status: 'todo',
    priority: 'high',
    assignee: 'Sarah Johnson',
    tags: ['design', 'ui'],
    createdAt: new Date('2024-01-15'),
    dueDate: new Date('2024-02-01'),
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
    dueDate: new Date('2024-01-25'),
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

export const Default: Story = {
  render: () => (
    <KanbanWrapper
      columns={defaultColumns}
      tasks={defaultTasks}
      onTaskMove={() => {}}
      onTaskCreate={() => {}}
      onTaskUpdate={() => {}}
      onTaskDelete={() => {}}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <KanbanWrapper
      columns={[
        { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: [] },
        { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
        { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
      ]}
      tasks={{}}
      onTaskMove={() => {}}
      onTaskCreate={() => {}}
      onTaskUpdate={() => {}}
      onTaskDelete={() => {}}
    />
  ),
};

const generateManyTasks = (): { columns: KanbanColumn[]; tasks: Record<string, KanbanTask> } => {
  const tasks: Record<string, KanbanTask> = {};
  const columns: KanbanColumn[] = [
    { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: [] },
    { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
    { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [] },
    { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
  ];

  const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> = ['low', 'medium', 'high', 'urgent'];
  const assignees = ['Alice Brown', 'Bob Smith', 'Carol White', 'David Lee', 'Emma Wilson'];
  const tags = [['frontend', 'react'], ['backend', 'api'], ['design', 'ui'], ['bug', 'urgent'], ['feature']];

  for (let i = 1; i <= 60; i++) {
    const columnIndex = i % 4;
    const taskId = `task-${i}`;
    const columnId = columns[columnIndex].id;

    tasks[taskId] = {
      id: taskId,
      title: `Task ${i}: Implement feature ${i}`,
      description: `Description for task ${i}`,
      status: columnId,
      priority: priorities[i % 4],
      assignee: assignees[i % 5],
      tags: tags[i % 5],
      createdAt: new Date(2024, 0, i),
      dueDate: i % 3 === 0 ? new Date(2024, 1, i) : undefined,
    };

    columns[columnIndex].taskIds.push(taskId);
  }

  return { columns, tasks };
};

export const WithManyTasks: Story = {
  render: () => {
    const { columns, tasks } = generateManyTasks();
    return (
      <KanbanWrapper
        columns={columns}
        tasks={tasks}
        onTaskMove={() => {}}
        onTaskCreate={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
      />
    );
  },
};

export const DifferentPriorities: Story = {
  render: () => (
    <KanbanWrapper
      columns={[
        {
          id: 'priorities',
          title: 'All Priorities',
          color: '#6366f1',
          taskIds: ['task-p1', 'task-p2', 'task-p3', 'task-p4'],
        },
      ]}
      tasks={{
        'task-p1': {
          id: 'task-p1',
          title: 'Urgent: Fix critical production bug',
          description: 'Server is down, needs immediate attention',
          status: 'priorities',
          priority: 'urgent',
          assignee: 'John Doe',
          tags: ['bug', 'critical'],
          createdAt: new Date(),
          dueDate: new Date(),
        },
        'task-p2': {
          id: 'task-p2',
          title: 'High: Complete Q1 report',
          description: 'Quarterly report for stakeholders',
          status: 'priorities',
          priority: 'high',
          assignee: 'Jane Smith',
          tags: ['report'],
          createdAt: new Date(),
          dueDate: new Date('2024-02-15'),
        },
        'task-p3': {
          id: 'task-p3',
          title: 'Medium: Update user guide',
          description: 'Add new features to documentation',
          status: 'priorities',
          priority: 'medium',
          assignee: 'Bob Johnson',
          tags: ['documentation'],
          createdAt: new Date(),
        },
        'task-p4': {
          id: 'task-p4',
          title: 'Low: Refactor utility functions',
          description: 'Code cleanup and optimization',
          status: 'priorities',
          priority: 'low',
          assignee: 'Alice Williams',
          tags: ['refactor'],
          createdAt: new Date(),
        },
      }}
      onTaskMove={() => {}}
      onTaskCreate={() => {}}
      onTaskUpdate={() => {}}
      onTaskDelete={() => {}}
    />
  ),
};

export const WithWIPLimits: Story = {
  render: () => (
    <KanbanWrapper
      columns={[
        { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: ['task-1', 'task-2'], maxTasks: 5 },
        { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-4', 'task-5'], maxTasks: 3 },
        { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-7'], maxTasks: 10 },
      ]}
      tasks={defaultTasks}
      onTaskMove={() => {}}
      onTaskCreate={() => {}}
      onTaskUpdate={() => {}}
      onTaskDelete={() => {}}
    />
  ),
};

export const InteractiveDemo: Story = {
  render: () => (
    <KanbanWrapper
      columns={defaultColumns}
      tasks={defaultTasks}
      onTaskMove={() => {}}
      onTaskCreate={() => {}}
      onTaskUpdate={() => {}}
      onTaskDelete={() => {}}
    />
  ),
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <KanbanWrapper
      columns={[
        { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: ['task-1', 'task-2'] },
        { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-4'] },
        { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-7'] },
      ]}
      tasks={defaultTasks}
      onTaskMove={() => {}}
      onTaskCreate={() => {}}
      onTaskUpdate={() => {}}
      onTaskDelete={() => {}}
    />
  ),
};
