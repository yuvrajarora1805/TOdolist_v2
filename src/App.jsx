import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ProgressBar from './components/ProgressBar';

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
const initialTomorrows = JSON.parse(localStorage.getItem('tomorrows')) || [];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [tomorrows, setTomorrows] = useState(initialTomorrows);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('tomorrows', JSON.stringify(tomorrows));
  }, [todos, tomorrows]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const addTomorrow = (text) => {
    setTomorrows([...tomorrows, { id: Date.now(), text }]);
  }

  const deleteTomorrow = (id) => {
    setTomorrows(tomorrows.filter(task => task.id !== id));
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <motion.div
      className="todo-app"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="app-header">
        <h1 className="app-title">✨ Todo List ✨</h1>
        <ProgressBar progress={progress} />
      </div>
      <TodoForm onSubmit={addTodo} />
      <AnimatePresence mode="popLayout">
        {todos.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="emoji">📝</span>
            No todos yet! Add some tasks to get started.
          </motion.div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </AnimatePresence>

      {/* Tomorrow's Targets Section */}
      {tomorrows.length > 0 && (
        <div className="app-header">
          <h2 className="app-title">✨ Tomorrow's Targets✨</h2>
        </div>
      )}
      <TodoForm onSubmit={addTomorrow} placeholder="Add tomorrow's task" />
      {tomorrows.length > 0 && (
        <>
          <button className="todo-button" onClick={() => {
            setTodos([...todos, ...tomorrows.map(task => ({ ...task, completed: false }))]);
            setTomorrows([]);
          }}>Move to Today</button>
          <TodoList
            todos={tomorrows}
            onDelete={deleteTomorrow}
          />
        </>
      )}
      {tomorrows.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="emoji">📝</span>
          No tasks for tomorrow yet! Add some targets to get started.
        </motion.div>
      )}
    </motion.div>
  )
}
