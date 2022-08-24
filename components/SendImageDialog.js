import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
} from '@mui/material'
import { forwardRef, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import styles from '../styles/SendImageDialog.module.css'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function SendImageDialog(props) {
  const [imageUrl, setImageUrl] = useState(null)
  const fullWidth = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    const fileUrl = URL.createObjectURL(props.imageFile)
    setImageUrl(fileUrl)
  }, [])

  const handleOnSend = () => {
    props.onSend()
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
      className={styles.sendImageDialog}
      sx={{
        maxWidth: fullWidth ? '100%' : '480px',
        maxHeight: fullWidth ? '100%' : '90vh',
      }}
      PaperProps={{
        style: {
          backgroundColor: '#0b1929',
          color: '#fff',
        },
      }}
    >
      <DialogTitle className={styles.title}>
        <IconButton onClick={props.handleClose} color="secondary">
          <CloseIcon />
        </IconButton>
        Selected Image
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt="file to send url"
              className={styles.image}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          disableElevation
          style={{ borderRadius: 0 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleOnSend}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}
