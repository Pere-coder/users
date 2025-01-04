'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/HomePage.module.css'

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
    return <div className={styles.loading}>Loading...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User List</h1>
      <div className={styles.grid}>
        {users.map((user) => (
          <div key={user.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{user.name}</h2>
              <p className={styles.cardEmail}>{user.email}</p>
              <p className={styles.cardCompany}>{user.company?.name}</p>
            </div>
            <div className={styles.cardFooter}>
              <Link to={`/user/${user.id}`} className={styles.button}>
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
}
