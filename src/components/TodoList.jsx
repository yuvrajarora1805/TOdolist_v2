import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'

export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      <AnimatePresence>
        {todos.map(todo => (
          <motion.li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">
              {todo.completed ? '✅ ' : '📌 '}
              {todo.text}
            </span>
            <motion.button
              className="delete-button"
              onClick={() => onDelete(todo.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiTrash2 />
            </motion.button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
