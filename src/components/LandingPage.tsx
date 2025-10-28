import { CheckCircle, Code, Layers, Zap } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layers className="w-8 h-8 text-sky-600" />
              <h1 className="text-2xl font-bold text-neutral-900">Kanban Board Component</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </a>
              <a href="#demo" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Demo
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <section className="py-20 text-center">
          <h2 className="text-5xl font-bold text-neutral-900 mb-6">
            Production-Grade Kanban Board
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            A fully accessible, performant Kanban Board component built from scratch with React, TypeScript,
            and Tailwind CSS. No pre-built libraries, just clean, maintainable code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo"
              className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
            >
              Try Live Demo
            </a>
          </div>
        </section>

        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-sky-600" />
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Drag & Drop</h4>
              <p className="text-neutral-600">
                Intuitive HTML5 drag-and-drop with smooth animations and visual feedback
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Accessible</h4>
              <p className="text-neutral-600">
                WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Type Safe</h4>
              <p className="text-neutral-600">
                Built with TypeScript strict mode for maximum type safety and developer experience
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Performant</h4>
              <p className="text-neutral-600">
                Optimized with React.memo and handles 500+ tasks without lag
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50 -mx-4 px-4 rounded-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-neutral-900 mb-8">
              Features Checklist
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Drag-and-drop tasks',
                'Task creation/editing',
                'Responsive design',
                'Keyboard accessibility',
                'WIP limits',
                'Priority levels',
                'Task assignments',
                'Due date tracking',
                'Tag management',
                'Mobile responsive',
                'Performance optimized',
                'TypeScript strict mode',
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold text-center text-neutral-900 mb-8">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React 18.3.1',
              'TypeScript 5.5.3',
              'Tailwind CSS 3.4.1',
              'Vite 5.4.2',
              'Storybook 8.6.14',
              'date-fns 4.1.0',
            ].map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-700 font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section id="demo" className="py-20">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to See It in Action?</h3>
            <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
              Try the interactive demo to experience the full Kanban board functionality with drag-and-drop,
              task management, and all the features in action.
            </p>
            <a
              href="/demo"
              className="inline-block px-8 py-3 bg-white text-sky-600 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
            >
              Try Live Demo
            </a>
          </div>
        </section>

        <footer className="py-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Layers className="w-6 h-6 text-sky-600" />
              <span className="text-neutral-600">Kanban Board Component</span>
            </div>
            <div className="flex space-x-6">
              <a href="/demo" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Live Demo
              </a>
              <a href="https://github.com" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                GitHub
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-neutral-500 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </div>
        </footer>
      </div>
    </div>
  );
};
