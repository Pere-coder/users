'use client'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from '../css/UserDetails.module.css'

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
    return <div className={styles.loading}>Loading...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  if (!user) {
    return <div className={styles.notFound}>User not found</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{user.name}</h1>
      <div className={styles.grid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          <p><strong>Website:</strong> {user.website || 'N/A'}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Address</h2>
          <p>{user.address?.street || 'N/A'}</p>
          <p>{user.address?.suite || 'N/A'}</p>
          <p>{user.address?.city || 'N/A'}, {user.address?.zipcode || 'N/A'}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Company</h2>
        <p><strong>Name:</strong> {user.company?.name || 'N/A'}</p>
        <p><strong>Catch Phrase:</strong> {user.company?.catchPhrase || 'N/A'}</p>
        <p><strong>BS:</strong> {user.company?.bs || 'N/A'}</p>
      </div>
      <Link to="/" className={styles.backButton}>
        Back to User List
      </Link>
    </div>
  )
}

