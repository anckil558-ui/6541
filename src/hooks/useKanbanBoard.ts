import { useState, useCallback } from 'react';
import { KanbanColumn, KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';

interface UseKanbanBoardProps {
  initialColumns: KanbanColumn[];
  initialTasks: Record<string, KanbanTask>;
}

export const useKanbanBoard = ({ initialColumns, initialTasks }: UseKanbanBoardProps) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);

  const handleTaskMove = useCallback(
    (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => {
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
    },
    []
  );

  const handleTaskCreate = useCallback((columnId: string, task: KanbanTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [task.id]: task,
    }));

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, taskIds: [...col.taskIds, task.id] } : col
      )
    );
  }, []);

  const handleTaskUpdate = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskId]: { ...prevTasks[taskId], ...updates },
    }));
  }, []);

  const handleTaskDelete = useCallback((taskId: string) => {
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
  }, []);

  return {
    columns,
    tasks,
    handleTaskMove,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
  };
};
