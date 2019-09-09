import React from 'react'
import './Border.css'

export default function H({ children }) {
  console.log(children)
  return (
    <div className="border">
      {children}
    </div>
  )
}