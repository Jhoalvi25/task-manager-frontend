import React from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white text-center p-4">
        <h1 className="text-3xl font-semibold">Task Manager</h1>
      </header>
      <main>
        <CreateTask />
        <TaskList />
      </main>
    </div>
  );
}

export default App;

