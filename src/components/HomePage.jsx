'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        return response.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-20 text-xl font-medium">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-20 text-xl font-medium">Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">User Directory</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold mb-1 text-gray-800">{user.name}</h2>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <p className="text-sm text-gray-400">{user.company?.name}</p>
            </div>
            <div className="p-4 flex justify-end">
              <Link
                to={`/user/${user.id}`}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
