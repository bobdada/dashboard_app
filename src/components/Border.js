import React from 'react'
import './Border.css'

export default function Border({ children }) {
  console.log(children)
  return (
    <div className="border">
      {children}
    </div>
  )
}