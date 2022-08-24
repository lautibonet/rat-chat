import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  addDoc,
  Timestamp,
  doc,
  setDoc,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { getDB } from '../client'

export default function useChatMessages(chatId) {
  const [messages, setMessages] = useState([])
  const db = getDB()
  const q = query(
    collection(db, 'chats', `${chatId}/messages`),
    orderBy('createdAt'),
    limit(25)
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setMessages(data)
    })

    return () => unsubscribe()
  }, [])

  const sendMessage = (chatId, senderEmail, text) => {
    addDoc(collection(db, 'chats', `${chatId}/messages`), {
      sender: senderEmail,
      text,
      type: 'text',
      createdAt: Timestamp.fromDate(new Date()),
    })
  }

  return {
    messages,
    sendMessage,
  }
}

const sendImage = async (chatId, senderEmail, image) => {
  const db = getDB()
  const messageRef = await doc(collection(db, 'chats', `${chatId}/messages`))
  const storage = getStorage()
  const imageRef = ref(storage, `images/${chatId}/${messageRef.id}`)
  return uploadBytes(imageRef, image).then(() => {
    setDoc(messageRef, {
      sender: senderEmail,
      type: 'image',
      image: `images/${chatId}/${messageRef.id}`,
      createdAt: Timestamp.fromDate(new Date()),
    })
  })
}

const getImageUrl = async (imagePath) => {
  if (!imagePath) return
  const storage = getStorage()
  return await getDownloadURL(ref(storage, imagePath))
}

export { sendImage, getImageUrl }
