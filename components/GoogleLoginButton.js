import styles from '../styles/GoogleLoginButton.module.css'
import { loginWithGoogle } from '../firebase/client'
import GoogleLogo from './GoogleLogo'

const GoogleLoginButton = () => {
  return (
    <button onClick={loginWithGoogle} className={styles.button__google}>
      <GoogleLogo width={32} height={32} />
      Login with google
    </button>
  )
}

export default GoogleLoginButton
