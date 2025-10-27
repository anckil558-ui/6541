import React, { memo } from 'react';
import { Calendar, Tag, MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import { KanbanTask } from './KanbanBoard.types';
import { Avatar } from '../primitives/Avatar';
import { isOverdue, formatDate, getPriorityColor } from '../../utils/task.utils';

interface KanbanCardProps {
  task: KanbanTask;
  isDragging: boolean;
  onEdit: (task: KanbanTask) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const KanbanCard = memo<KanbanCardProps>(({
  task,
  isDragging,
  onEdit,
  onDragStart,
  onDragEnd,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onEdit(task);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onClick={() => onEdit(task)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. ${task.priority ? `Priority: ${task.priority}.` : ''} Press Enter to edit.`}
      aria-grabbed={isDragging}
      className={clsx(
        'bg-white border border-neutral-200 rounded-lg p-3 shadow-sm transition-all',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab active:cursor-grabbing'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2 flex-1">
          {task.title}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Task options"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-1 mb-3 flex-wrap">
          <Tag size={12} className="text-neutral-400" />
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-neutral-500">+{task.tags.length - 3}</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {task.priority && (
            <span className={clsx('text-xs px-2 py-0.5 rounded font-medium', getPriorityColor(task.priority))}>
              {task.priority}
            </span>
          )}
        </div>
        {task.assignee && <Avatar name={task.assignee} size="sm" />}
      </div>

      {task.dueDate && (
        <div
          className={clsx(
            'flex items-center gap-1 text-xs mt-2 pt-2 border-t border-neutral-100',
            isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-neutral-500'
          )}
        >
          <Calendar size={12} />
          <span>{formatDate(task.dueDate)}</span>
          {isOverdue(task.dueDate) && <span className="ml-1">(Overdue)</span>}
        </div>
      )}
    </div>
  );
});

KanbanCard.displayName = 'KanbanCard';
