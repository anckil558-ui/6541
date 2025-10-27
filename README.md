# Kanban Board Component Library

A production-grade, fully accessible Kanban Board component built from scratch using React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Drag-and-Drop Interface**: Intuitive task movement between columns with visual feedback
- **Task Management**: Create, edit, update, and delete tasks with comprehensive details
- **Column Management**: Multiple columns with customizable colors and WIP limits
- **Priority System**: Four priority levels (low, medium, high, urgent) with visual indicators
- **Rich Task Details**: Titles, descriptions, assignees, tags, due dates, and priorities
- **WIP Limits**: Optional work-in-progress limits per column with visual warnings

### Accessibility (WCAG 2.1 AA Compliant)
- Full keyboard navigation support
- ARIA labels and roles for screen readers
- Focus management and visible focus indicators
- Semantic HTML structure
- Color contrast compliance

### Performance Optimizations
- React.memo for expensive component re-renders
- Optimized drag-and-drop with minimal re-renders
- Efficient state management with useMemo and useCallback
- Support for 500+ tasks without lag

### Design System
- Clean, modern SaaS product design
- Consistent spacing using 4px base unit
- Professional color palette avoiding purple/indigo
- Subtle micro-interactions and hover states
- Fully responsive (mobile, tablet, desktop)

## Technology Stack

- **React** 18.3.1 - Component framework
- **TypeScript** 5.5.3 - Type-safe development
- **Tailwind CSS** 3.4.1 - Utility-first styling
- **Vite** 5.4.2 - Build tooling
- **Storybook** 8.6.14 - Component documentation
- **date-fns** 4.1.0 - Date manipulation
- **clsx** 2.1.1 - Conditional class management
- **Lucide React** 0.344.0 - Icon library

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard/
│   │   ├── KanbanBoard.tsx           # Main board component
│   │   ├── KanbanBoard.stories.tsx   # Storybook stories
│   │   ├── KanbanBoard.types.ts      # TypeScript definitions
│   │   ├── KanbanColumn.tsx          # Column component
│   │   ├── KanbanCard.tsx            # Task card component
│   │   └── TaskModal.tsx             # Task detail modal
│   └── primitives/
│       ├── Button.tsx                # Reusable button
│       ├── Modal.tsx                 # Modal component
│       └── Avatar.tsx                # Avatar component
├── hooks/
│   └── useDragAndDrop.ts            # Drag-and-drop logic
├── utils/
│   ├── task.utils.ts                # Task utility functions
│   └── column.utils.ts              # Column utility functions
└── styles/
    └── globals.css                   # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the application:
```bash
npm run dev
```

Run Storybook:
```bash
npm run storybook
```

### Build

```bash
npm run build
```

Build Storybook:
```bash
npm run build-storybook
```

## Usage

### Basic Example

```tsx
import { useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import { KanbanColumn, KanbanTask } from './components/KanbanBoard/KanbanBoard.types';

const columns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#94a3b8', taskIds: [] },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
];

function App() {
  const [columns, setColumns] = useState(columns);
  const [tasks, setTasks] = useState({});

  const handleTaskMove = (taskId, fromColumn, toColumn, newIndex) => {
    // Handle task movement logic
  };

  const handleTaskCreate = (columnId, task) => {
    // Handle task creation logic
  };

  const handleTaskUpdate = (taskId, updates) => {
    // Handle task updates logic
  };

  const handleTaskDelete = (taskId) => {
    // Handle task deletion logic
  };

  return (
    <KanbanBoard
      columns={columns}
      tasks={tasks}
      onTaskMove={handleTaskMove}
      onTaskCreate={handleTaskCreate}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
    />
  );
}
```

## Storybook Stories

The component includes comprehensive Storybook stories demonstrating:

1. **Default** - Basic kanban board with sample data
2. **Empty State** - Board with no tasks
3. **With Many Tasks** - Board with 60+ tasks to test performance
4. **Different Priorities** - Showcase all priority levels
5. **With WIP Limits** - Demonstrates work-in-progress limits
6. **Interactive Demo** - Fully functional drag-and-drop

Access stories at `http://localhost:6006` after running `npm run storybook`.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus between interactive elements |
| Shift + Tab | Move focus backwards |
| Enter / Space | Activate focused element or open task modal |
| Escape | Close modal |
| Arrow Keys | Navigate between elements |

## Component Props

### KanbanBoard

```typescript
interface KanbanViewProps {
  columns: KanbanColumn[];
  tasks: Record<string, KanbanTask>;
  onTaskMove: (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => void;
  onTaskCreate: (columnId: string, task: KanbanTask) => void;
  onTaskUpdate: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete: (taskId: string) => void;
}
```

### KanbanTask

```typescript
interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  tags?: string[];
  createdAt: Date;
  dueDate?: Date;
}
```

### KanbanColumn

```typescript
interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
  maxTasks?: number;
}
```

## Design Decisions

### No Pre-built Libraries
This component is built entirely from scratch without using:
- Component libraries (Radix, Shadcn, MUI, etc.)
- CSS-in-JS solutions
- Pre-built drag-and-drop libraries (except low-level HTML5 API)
- UI generators or builders

### Custom Drag-and-Drop Implementation
The drag-and-drop functionality uses the native HTML5 Drag and Drop API with custom logic for:
- Visual feedback during drag operations
- Drop position calculation
- Column boundary detection
- Smooth animations

### Performance Considerations
- Components use React.memo to prevent unnecessary re-renders
- State updates are optimized to minimize cascading renders
- Large lists are handled efficiently with proper key management
- Drag operations update only affected components

### Accessibility First
Every interactive element includes:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader announcements
- Semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built for the Design System Component Library frontend developer hiring challenge.
