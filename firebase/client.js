import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth'
import { saveUser } from './repository/user'
import { formatAuthUser } from '../utils/utils'

const firebaseConfig = {
  apiKey: 'AIzaSyCJZHk_wZoHK2yyevDS6M5gxU0xKVf_Vpc',
  authDomain: 'rat-chat-783aa.firebaseapp.com',
  projectId: 'rat-chat-783aa',
  storageBucket: 'rat-chat-783aa.appspot.com',
  messagingSenderId: '581047517243',
  appId: '1:581047517243:web:0e16f0b060926e4d065c1e',
  measurementId: 'G-8ZKR6VD17N',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

const loginWithGoogle = () => {
  signInWithRedirect(auth, provider)
}

const getLoginResult = (callback) => {
  getRedirectResult(auth).then((result) => {
    if (result) {
      saveUser(formatAuthUser(result.user))
    }
    callback(result)
  })
}

const logout = () => {
  return signOut(auth)
}

const onIdTokenChanged = (callback) => {
  return auth.onIdTokenChanged(callback)
}

const onAuthStateChanged = (next, error) => {
  return auth.onAuthStateChanged(next, error)
}

const getDB = () => {
  return db
}

export {
  loginWithGoogle,
  getLoginResult,
  logout,
  onIdTokenChanged,
  onAuthStateChanged,
  getDB,
}
