import styles from '../styles/Main.module.css'
import GoogleLoginButton from '../components/GoogleLoginButton'
import RatChatLogo from '../components/RatChatLogo'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLoginResult } from '../firebase/client'
import { useAuth } from '../auth/authUserProvider'

export default function Main() {
  const router = useRouter()
  const { authUser, loading } = useAuth()

  useEffect(() => {
    getLoginResult((result) => {
      if (result) {
        router.replace('/home')
      } else {
        if (authUser) {
          router.replace('/home')
        }
      }
    })
  }, [])

  return (
    <>
      {!loading && !authUser && (
        <div className={styles.login__container}>
          <RatChatLogo height={120} width={120} />
          <h1 className={styles.title}>Rat Chat</h1>
          <h2 className={styles.subtitle}>A refuge from the world above</h2>
          <GoogleLoginButton />
        </div>
      )}
    </>
  )
}
