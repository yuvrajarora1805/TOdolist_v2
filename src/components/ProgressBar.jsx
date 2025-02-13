import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
