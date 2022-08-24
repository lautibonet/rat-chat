import {
  doc,
  setDoc,
  collection,
  getDoc,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getDB } from '../client'

const saveUser = ({ displayName, email, photoURL }) => {
  try {
    const db = getDB()
    const userRef = doc(db, 'users', email)
    setDoc(
      userRef,
      {
        displayName,
        email,
        photoURL,
      },
      { merge: true }
    )
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const getUser = async (userId) => {
  const db = getDB()
  const userRef = doc(db, 'users', userId)
  const userDoc = await getDoc(userRef)
  return {
    id: userDoc.id,
    ...userDoc.data(),
  }
}

export default function useUsers() {
  const [users, setUsers] = useState([])
  const db = getDB()
  const q = query(collection(db, 'users'))

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setUsers(data)
    })

    return () => unsubscribe()
  }, [])

  return {
    users,
  }
}

export { saveUser, getUser }
