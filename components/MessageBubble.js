import { Box } from '@mui/system'
import styles from '../styles/MessageBubble.module.css'

export default function MessageBubble(props) {
  return (
    <Box
      sx={{
        alignSelf: props.isOwner ? 'end' : 'start',
      }}
      className={styles.container}
    >
      <Box
        sx={{
          backgroundColor: props.isOwner ? 'primary.main' : 'secondary.light',
          color: props.isOwner ? '#fff' : '#000',
        }}
        className={styles.bubble}
      >
        <p className={styles.text}>{props.text}</p>
      </Box>
    </Box>
  )
}
