import Head from 'next/head'
import { useAuth } from '../auth/authUserProvider'
import CircularProgress from '@mui/material/CircularProgress'
import { Paper } from '@mui/material'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  const { loading } = useAuth()

  return (
    <div>
      <Head>
        <title>Rat Chat</title>
        <meta name="description" content="Rat Chat by @lautibonet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.app__container}>
        <Paper elevation={6} square className={styles.main__container}>
          {/* <main className="main-container"> */}
          {loading && (
            <div className="spinner-container" styles={{ height: '100%' }}>
              <CircularProgress />
            </div>
          )}
          {!loading && children}
          {/* </main> */}
        </Paper>
      </div>
    </div>
  )
}

export default Layout
