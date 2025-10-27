# Quick Start Guide

Get up and running with the Kanban Board component in minutes.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open Storybook
npm run storybook
```

## View the Component

### Option 1: Development Server
1. Run `npm run dev`
2. Open http://localhost:5173
3. See the full Kanban Board in action

### Option 2: Storybook (Recommended)
1. Run `npm run storybook`
2. Open http://localhost:6006
3. Browse all component variants and states

## Storybook Stories

Access these stories to see different use cases:

- **Default** - Standard board with sample tasks
- **Empty State** - Board with no tasks
- **With Many Tasks** - Performance test with 60+ tasks
- **Different Priorities** - All priority levels showcased
- **With WIP Limits** - Work-in-progress limits demo
- **Interactive Demo** - Fully functional drag-and-drop
- **Mobile View** - Responsive mobile layout

## Basic Usage

### Simple Implementation

```tsx
import { useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import { useKanbanBoard } from './hooks/useKanbanBoard';

const initialColumns = [
  { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: [] },
  { id: 'doing', title: 'Doing', color: '#3b82f6', taskIds: [] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
];

function MyApp() {
  const {
    columns,
    tasks,
    handleTaskMove,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
  } = useKanbanBoard({
    initialColumns,
    initialTasks: {},
  });

  return (
    <div style={{ height: '100vh' }}>
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
}
```

## Creating Tasks

Tasks are created with the following structure:

```typescript
const newTask: KanbanTask = {
  id: 'unique-id',
  title: 'Task Title',
  description: 'Optional description',
  status: 'todo', // Column ID
  priority: 'high', // 'low' | 'medium' | 'high' | 'urgent'
  assignee: 'John Doe',
  tags: ['frontend', 'react'],
  createdAt: new Date(),
  dueDate: new Date('2024-12-31'),
};
```

## Adding Columns

Columns are configured with:

```typescript
const column: KanbanColumn = {
  id: 'unique-id',
  title: 'Column Title',
  color: '#3b82f6', // Hex color
  taskIds: ['task-1', 'task-2'],
  maxTasks: 5, // Optional WIP limit
};
```

## Key Features Demo

### Drag and Drop
1. Click and hold any task card
2. Drag to another column
3. Release to drop
4. Task moves to new column

### Edit Task
1. Click any task card
2. Modal opens with task details
3. Edit any field
4. Click "Save Changes"

### Create Task
1. Click "Add Task" button in any column
2. Modal opens with empty form
3. Fill in task details
4. Click "Save Changes"

### Delete Task
1. Open task modal
2. Click "Delete Task" button
3. Confirm deletion

## Keyboard Navigation

- **Tab**: Navigate between elements
- **Enter/Space**: Open task or activate button
- **Escape**: Close modal
- **Drag with keyboard**: Press Space to grab, arrows to move, Enter to drop

## Customization

### Colors

Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
      },
    },
  },
}
```

### Column Width

Adjust column width in `KanbanColumn.tsx`:

```typescript
style={{ minWidth: '320px', maxWidth: '320px' }}
```

### Priority Colors

Modify priority colors in `src/utils/task.utils.ts`:

```typescript
const colors = {
  low: 'bg-blue-100 text-blue-700 border-l-4 border-blue-500',
  medium: 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500',
  high: 'bg-orange-100 text-orange-700 border-l-4 border-orange-500',
  urgent: 'bg-red-100 text-red-700 border-l-4 border-red-500',
};
```

## Testing

### Run Type Check

```bash
npm run typecheck
```

### Build for Production

```bash
npm run build
```

### Build Storybook

```bash
npm run build-storybook
```

## Common Tasks

### Add a New Priority Level

1. Update `Priority` type in `KanbanBoard.types.ts`
2. Add color mapping in `task.utils.ts`
3. Add option in `TaskModal.tsx`

### Add Task Filtering

1. Add filter state to `KanbanBoard`
2. Filter `columnTasksMap` based on criteria
3. Add filter UI controls

### Persist Data

1. Add backend API calls in handlers
2. Use `onTaskMove`, `onTaskCreate`, etc. to sync
3. Load initial data on mount

## Troubleshooting

### Cards Not Dragging
- Check browser supports HTML5 drag-and-drop
- Verify `draggable` attribute is set
- Check console for JavaScript errors

### Performance Issues
- Reduce number of visible tasks
- Check for unnecessary re-renders in DevTools
- Consider virtual scrolling for large lists

### Styling Issues
- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Inspect element in browser DevTools

## Next Steps

1. Read the [README.md](README.md) for full documentation
2. Explore [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for implementation details
3. Browse Storybook for component examples
4. Customize for your use case

## Support

For issues or questions:
1. Check existing documentation
2. Review Storybook examples
3. Inspect component source code
4. Open an issue on the repository

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Storybook Guides](https://storybook.js.org/docs)
- [date-fns Documentation](https://date-fns.org/docs)
