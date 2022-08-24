import React, { useEffect } from 'react'
import router from 'next/router'
import { onAuthStateChanged } from '../firebase/client'

const Protected = ({ children }) => {
  useEffect(() => {
    onAuthStateChanged(
      (authUser) => {
        if (!authUser) {
          router.push('/')
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  return <>{children}</>
}

export default Protected
