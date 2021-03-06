import Head from 'next/head'
import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../styles/Home.module.scss'
import UsersTable from '../sections/UsersTable'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pharma Inc</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Pharma Inc</h1>
        <UsersTable/>
      </Container>

    </div>
  )
}
