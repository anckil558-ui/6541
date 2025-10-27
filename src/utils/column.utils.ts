import { KanbanColumn } from '../components/KanbanBoard/KanbanBoard.types';

export const isColumnAtLimit = (column: KanbanColumn, taskCount: number): boolean => {
  if (!column.maxTasks) return false;
  return taskCount >= column.maxTasks;
};

export const isColumnNearLimit = (column: KanbanColumn, taskCount: number): boolean => {
  if (!column.maxTasks) return false;
  return taskCount >= column.maxTasks * 0.8;
};
