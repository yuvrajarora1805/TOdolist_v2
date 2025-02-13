import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function TodoForm({ onSubmit }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSubmit(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="✍️ Add a new task..."
        className="todo-input"
      />
      <motion.button
        type="submit"
        className="todo-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Task
      </motion.button>
    </form>
  )
}
