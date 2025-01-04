import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        List Of Users
      </Link>
    </div>
  </header>
  )
}

