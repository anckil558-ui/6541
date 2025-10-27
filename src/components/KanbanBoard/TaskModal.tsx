import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { KanbanTask, Priority } from './KanbanBoard.types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: KanbanTask | null;
  columns: Array<{ id: string; title: string }>;
  onSave: (taskId: string, updates: Partial<KanbanTask>) => void;
  onDelete: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  columns,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Partial<KanbanTask>>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        assignee: task.assignee || '',
        tags: task.tags || [],
        dueDate: task.dueDate,
      });
    }
  }, [task]);

  const handleSave = () => {
    if (!task || !formData.title?.trim()) return;

    onSave(task.id, {
      ...formData,
      title: formData.title.trim(),
    });
    onClose();
  };

  const handleDelete = () => {
    if (!task) return;
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags?.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), trimmedTag],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" size="lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-neutral-700 mb-1">
            Title *
          </label>
          <input
            id="task-title"
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Task title"
          />
        </div>

        <div>
          <label htmlFor="task-description" className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            id="task-description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            placeholder="Task description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-neutral-700 mb-1">
              Status
            </label>
            <select
              id="task-status"
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="task-priority" className="block text-sm font-medium text-neutral-700 mb-1">
              Priority
            </label>
            <select
              id="task-priority"
              value={formData.priority || ''}
              onChange={(e) => setFormData({ ...formData, priority: (e.target.value || undefined) as Priority })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-assignee" className="block text-sm font-medium text-neutral-700 mb-1">
              Assignee
            </label>
            <input
              id="task-assignee"
              type="text"
              value={formData.assignee || ''}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="task-due-date" className="block text-sm font-medium text-neutral-700 mb-1">
              Due Date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="task-tags" className="block text-sm font-medium text-neutral-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              id="task-tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add a tag"
            />
            <Button onClick={handleAddTag} variant="secondary" size="md">
              Add
            </Button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-neutral-500 hover:text-neutral-700"
                    aria-label={`Remove ${tag} tag`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t border-neutral-200">
          <Button onClick={handleDelete} variant="danger" size="md">
            <Trash2 size={16} className="mr-2" />
            Delete Task
          </Button>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="secondary" size="md">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="primary" size="md" disabled={!formData.title?.trim()}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
