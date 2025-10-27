import React, { memo } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { KanbanColumn as KanbanColumnType, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';
import { isColumnAtLimit, isColumnNearLimit } from '../../utils/column.utils';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  draggedTaskId: string | null;
  onTaskEdit: (task: KanbanTask) => void;
  onTaskCreate: (columnId: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string, columnId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent, columnId: string, index: number) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

export const KanbanColumn = memo<KanbanColumnProps>(({
  column,
  tasks,
  draggedTaskId,
  onTaskEdit,
  onTaskCreate,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}) => {
  const taskCount = tasks.length;
  const atLimit = isColumnAtLimit(column, taskCount);
  const nearLimit = isColumnNearLimit(column, taskCount);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex flex-col bg-neutral-50 rounded-xl border border-neutral-200 h-full"
      style={{ minWidth: '320px', maxWidth: '320px' }}
      role="region"
      aria-label={`${column.title} column. ${taskCount} tasks.`}
    >
      <div className="sticky top-0 bg-neutral-50 px-4 py-3 border-b border-neutral-200 rounded-t-xl z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: column.color }}
              aria-hidden="true"
            />
            <h3 className="font-semibold text-neutral-900">{column.title}</h3>
            <span className="text-sm text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full">
              {taskCount}
            </span>
          </div>
        </div>
        {column.maxTasks && (
          <div
            className={clsx(
              'flex items-center gap-1 text-xs',
              atLimit ? 'text-red-600' : nearLimit ? 'text-yellow-600' : 'text-neutral-500'
            )}
          >
            {(atLimit || nearLimit) && <AlertCircle size={12} />}
            <span>
              WIP Limit: {taskCount}/{column.maxTasks}
            </span>
          </div>
        )}
      </div>

      <div
        className="flex-1 px-4 py-3 overflow-y-auto space-y-3 min-h-[200px]"
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver(e, column.id, tasks.length);
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={(e) => onDrop(e, column.id)}
      >
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-neutral-400 text-sm">
            No tasks yet
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDragOver(e, column.id, index);
              }}
            >
              <KanbanCard
                task={task}
                isDragging={draggedTaskId === task.id}
                onEdit={onTaskEdit}
                onDragStart={(e, taskId) => onDragStart(e, taskId, column.id)}
                onDragEnd={onDragEnd}
              />
            </div>
          ))
        )}
      </div>

      <div className="sticky bottom-0 bg-neutral-50 px-4 py-3 border-t border-neutral-200 rounded-b-xl">
        <button
          onClick={() => onTaskCreate(column.id)}
          disabled={atLimit}
          className={clsx(
            'w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            atLimit
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
          )}
          aria-label={`Add new task to ${column.title}`}
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>
    </div>
  );
});

KanbanColumn.displayName = 'KanbanColumn';
