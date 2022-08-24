import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  doc,
} from 'firebase/firestore'
import { getDB } from '../client'

const getChatByUserAOrUserB = async (userARef, userBRef, db) => {
  let q = query(
    collection(db, 'chats'),
    where('userARef', '==', userARef),
    where('userBRef', '==', userBRef)
  )

  const querySnapshot = await getDocs(q)
  const data = []
  querySnapshot.forEach((doc) =>
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  )
  return data.length > 0 ? data[0] : null
}

const createChat = async (userARef, userBRef, db) => {
  const chatRef = await addDoc(collection(db, 'chats'), {
    userARef,
    userBRef,
  })
  const doc = await getDoc(chatRef)
  return {
    id: doc.id,
    ...doc.data(),
  }
}

export default async function getChat(currenUserEmail, chatUserEmail) {
  const db = getDB()
  const currentUserRef = doc(db, 'users', currenUserEmail)
  const chatUserRef = doc(db, 'users', chatUserEmail)
  let chat = await getChatByUserAOrUserB(currentUserRef, chatUserRef, db)
  if (chat) return chat
  chat = await getChatByUserAOrUserB(chatUserRef, currentUserRef, db)
  if (chat) return chat
  return createChat(currentUserRef, chatUserRef, db)
}
