import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          User Directory
        </Link>
      </div>
    </header>
  )
}

