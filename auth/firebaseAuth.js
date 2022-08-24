import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  logout as firebaseLogout,
  onIdTokenChanged,
} from '../firebase/client'
import { formatAuthUser } from '../utils/utils'
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from './userCookie'

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(getUserFromCookie())
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const logout = async () => {
    return firebaseLogout()
      .then(() => router.replace('/'))
      .catch((e) => console.error(e))
  }

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }
    setLoading(true)
    var formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const idTokenChanged = async (userToken) => {
    if (userToken) {
      const userData = await formatAuthUser(userToken)
      setUserCookie(userData)
      setAuthUser(userData)
    } else {
      removeUserCookie()
      setAuthUser()
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(idTokenChanged)
    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      return
    }
    setAuthUser(userFromCookie)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    logout,
  }
}
