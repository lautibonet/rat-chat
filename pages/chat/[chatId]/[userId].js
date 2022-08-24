import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  Paper,
  TextField,
} from '@mui/material'
import styles from '../../../styles/Chat.module.css'
import { withStyles } from '@mui/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAuth } from '../../../auth/authUserProvider'
import Protected from '../../../auth/protectedRoute'
import RatChatAppBar from '../../../components/RatChatAppBar'
import useChatMessages from '../../../firebase/repository/message'
import { getUser as getUserFromDB } from '../../../firebase/repository/user'
import MessageBubble from '../../../components/MessageBubble'
import ImageIcon from '@mui/icons-material/Image'
import SendImageDialog from '../../../components/SendImageDialog'
import ImageMessage from '../../../components/ImageMessage'
import { sendImage as uploadImage } from '../../../firebase/repository/message'
import ImageMessageLoader from '../../../components/ImageMessageLoader'

const NoBorderRadiusTextField = withStyles({
  root: {
    '& .MuiFilledInput-root': {
      borderRadius: '0',
    },
  },
})(TextField)

const GoBackButton = () => {
  const router = useRouter()

  return (
    <IconButton onClick={() => router.back()}>
      <ArrowBackIcon />
    </IconButton>
  )
}

const UserAvatar = (props) => {
  return <Avatar referrerPolicy="no-referrer" src={props.url} alt={props.alt} />
}

export default function Chat() {
  const router = useRouter()
  const { chatId, userId } = router.query
  const { messages, sendMessage } = useChatMessages(chatId)
  const [textValue, setTextValue] = useState('')
  const { authUser } = useAuth()
  const [user, setUser] = useState(null)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [loadingImageSent, setLoadingImageSent] = useState(false)

  const hiddenFileInput = useRef(null)
  const scrollRef = useRef(null)

  const triggerFileUpload = () => {
    hiddenFileInput.current.click()
  }

  const handleFileUpload = (event) => {
    if (!event.target.files || event.target.files.length === 0) return
    const selectedFile = event.target.files[0]
    setImageFile(selectedFile)
    setImageDialogOpen(true)
  }

  const handleDialogClose = () => {
    setImageDialogOpen(false)
    setImageFile(null)
    hiddenFileInput.current.value = ''
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' })
    }
  }, [messages, loadingImageSent])

  useEffect(() => {
    const getUser = async () => {
      const dbUser = await getUserFromDB(userId)
      setUser(dbUser)
    }

    getUser()
  }, [])

  const sendText = (e) => {
    e.preventDefault()
    sendMessage(chatId, authUser.email, textValue)
    setTextValue('')
  }

  const sendImage = () => {
    setLoadingImageSent(true)
    handleDialogClose()
    uploadImage(chatId, authUser.email, imageFile).then(() => {
      setLoadingImageSent(false)
    })
  }

  return (
    <Protected>
      <section className="section-content">
        <RatChatAppBar
          leading={<GoBackButton />}
          title={user && user.displayName}
          trailing={
            user && <UserAvatar url={user.photoURL} alt={user.displayName} />
          }
        ></RatChatAppBar>
        <Divider />

        {imageFile && (
          <SendImageDialog
            open={imageDialogOpen}
            handleClose={handleDialogClose}
            imageFile={imageFile}
            onSend={sendImage}
          />
        )}

        <Paper
          elevation={0}
          style={{
            backgroundColor: 'transparent',
            maxHeight: 'calc(100% - 121px)',
            overflow: 'auto',
          }}
        >
          <List className={styles.messagesContainer}>
            {messages &&
              messages.map((message) =>
                message.type === 'image' ? (
                  <ImageMessage
                    key={message.id}
                    imageReference={message.image}
                    isOwner={message.sender === authUser.email}
                  />
                ) : (
                  <MessageBubble
                    key={message.id}
                    text={message.text}
                    isOwner={message.sender === authUser.email}
                  />
                )
              )}
            {loadingImageSent && (
              <ImageMessageLoader isOwner={true} sx={{ margin: '0 8px' }} />
            )}
            <span ref={scrollRef}></span>
          </List>
        </Paper>

        <form onSubmit={sendText} className={styles.form}>
          <NoBorderRadiusTextField
            autoFocus
            fullWidth
            label="Message"
            variant="filled"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="upload image"
                    onClick={triggerFileUpload}
                    edge="end"
                  >
                    <ImageIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& input': {
                borderRadius: '0px',
              },
            }}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <input
            accept="image/*"
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <Button
            disableElevation
            style={{ borderRadius: 0 }}
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </form>
      </section>
    </Protected>
  )
}
