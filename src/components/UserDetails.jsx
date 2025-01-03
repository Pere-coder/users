'use client'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function UserDetails() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user details')
        }
        return response.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  if (!user) {
    return <div className="text-center">User not found</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">{user.name}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          <p><strong>Website:</strong> {user.website || 'N/A'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p>{user.address?.street || 'N/A'}</p>
          <p>{user.address?.suite || 'N/A'}</p>
          <p>{user.address?.city || 'N/A'}, {user.address?.zipcode || 'N/A'}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Company</h2>
        <p><strong>Name:</strong> {user.company?.name || 'N/A'}</p>
        <p><strong>Catch Phrase:</strong> {user.company?.catchPhrase || 'N/A'}</p>
        <p><strong>BS:</strong> {user.company?.bs || 'N/A'}</p>
      </div>
      <Link
        to="/"
        className="inline-block mt-8 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Back to User List
      </Link>
    </div>
  )
}
