import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { getImageUrl } from '../firebase/repository/message'
import styles from '../styles/ImageMessage.module.css'
import ImageMessageLoader from './ImageMessageLoader'

export default function ImageMessage(props) {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const getImage = async () => {
      const url = await getImageUrl(props.imageReference)
      setImageUrl(url)
    }

    getImage()
  }, [])

  return (
    <>
      <Box
        className={styles.imageContainer}
        sx={{
          alignSelf: props.isOwner ? 'end' : 'start',
        }}
      >
        {!imageLoaded && <ImageMessageLoader />}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={props.imageReference}
            className={styles.image}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </Box>
    </>
  )
}
