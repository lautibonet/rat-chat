import '../styles/globals.css'
import { AuthUserProvider } from '../auth/authUserProvider'
import Layout from '../components/Layout'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a81d6',
    },
    secondary: {
      light: '#e0eeff',
      main: '#A3ABBD',
      dark: '#3F4756',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

function RatChatApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthUserProvider>
  )
}

export default RatChatApp
