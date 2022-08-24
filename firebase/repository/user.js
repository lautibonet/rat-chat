import { doc, setDoc, getDocs, collection, getDoc } from 'firebase/firestore'
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

const getAllUsers = (callback) => {
  const db = getDB()
  getDocs(collection(db, 'users')).then((querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    callback(data)
  })
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

export { saveUser, getAllUsers, getUser }
