import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
export default function RoutesWithFallback({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate replace to="/posts" />} />
    </Routes>
  )
}
