import React, { useState, useCallback, useMemo } from 'react';
import { KanbanViewProps, KanbanTask } from './KanbanBoard.types';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from './TaskModal';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

export const KanbanBoard: React.FC<KanbanViewProps> = ({
  columns,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isDragging,
    draggedId,
    sourceColumnId,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop();

  const handleTaskEdit = useCallback((task: KanbanTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  }, []);

  const handleTaskSave = useCallback(
    (taskId: string, updates: Partial<KanbanTask>) => {
      const currentTask = tasks[taskId];
      if (!currentTask) return;

      if (updates.status && updates.status !== currentTask.status) {
        const sourceColumn = columns.find((col) => col.id === currentTask.status);
        const targetColumn = columns.find((col) => col.id === updates.status);

        if (sourceColumn && targetColumn) {
          onTaskMove(taskId, sourceColumn.id, targetColumn.id, targetColumn.taskIds.length);
        }
      }

      onTaskUpdate(taskId, updates);
    },
    [tasks, columns, onTaskMove, onTaskUpdate]
  );

  const handleCreateTask = useCallback(
    (columnId: string) => {
      const newTask: KanbanTask = {
        id: `task-${Date.now()}`,
        title: 'New Task',
        status: columnId,
        createdAt: new Date(),
      };
      onTaskCreate(columnId, newTask);
      setSelectedTask(newTask);
      setIsModalOpen(true);
    },
    [onTaskCreate]
  );

  const onDragStartHandler = useCallback(
    (e: React.DragEvent, taskId: string, columnId: string) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', taskId);
      handleDragStart(taskId, columnId);
    },
    [handleDragStart]
  );

  const onDragOverHandler = useCallback(
    (e: React.DragEvent, columnId: string, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      handleDragOver(columnId, index);
    },
    [handleDragOver]
  );

  const onDropHandler = useCallback(
    (e: React.DragEvent, targetColId: string) => {
      e.preventDefault();

      if (!draggedId || !sourceColumnId) {
        handleDragEnd();
        return;
      }

      const sourceColumn = columns.find((col) => col.id === sourceColumnId);
      const targetColumn = columns.find((col) => col.id === targetColId);

      if (!sourceColumn || !targetColumn) {
        handleDragEnd();
        return;
      }

      const sourceIndex = sourceColumn.taskIds.indexOf(draggedId);
      let targetIndex = dragOverIndex !== null ? dragOverIndex : targetColumn.taskIds.length;

      if (sourceColumnId === targetColId) {
        if (sourceIndex === targetIndex || sourceIndex === targetIndex - 1) {
          handleDragEnd();
          return;
        }
        if (sourceIndex < targetIndex) {
          targetIndex--;
        }
      }

      onTaskMove(draggedId, sourceColumnId, targetColId, targetIndex);
      handleDragEnd();
    },
    [draggedId, sourceColumnId, dragOverIndex, columns, onTaskMove, handleDragEnd]
  );

  const onDragEndHandler = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const columnTasksMap = useMemo(() => {
    const map: Record<string, KanbanTask[]> = {};
    columns.forEach((column) => {
      map[column.id] = column.taskIds
        .map((taskId) => tasks[taskId])
        .filter((task): task is KanbanTask => task !== undefined);
    });
    return map;
  }, [columns, tasks]);

  return (
    <div className="h-full w-full bg-white">
      <div className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 p-6 h-full">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={columnTasksMap[column.id] || []}
              draggedTaskId={isDragging ? draggedId : null}
              onTaskEdit={handleTaskEdit}
              onTaskCreate={handleCreateTask}
              onDragStart={onDragStartHandler}
              onDragEnd={onDragEndHandler}
              onDragOver={onDragOverHandler}
              onDrop={onDropHandler}
            />
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        columns={columns.map((col) => ({ id: col.id, title: col.title }))}
        onSave={handleTaskSave}
        onDelete={onTaskDelete}
      />
    </div>
  );
};
