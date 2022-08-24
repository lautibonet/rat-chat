import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Protected from '../auth/protectedRoute'

export default function RedirectToHome() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/home')
  }, [])

  return <Protected />
}
