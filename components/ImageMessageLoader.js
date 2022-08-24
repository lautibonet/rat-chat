import { Skeleton } from '@mui/material'

export default function ImageMessageLoader(props) {
  return (
    <Skeleton
      variant="rectangular"
      width={150}
      height={150}
      sx={{
        ...props.sx,
        borderRadius: '8px',
        alignSelf: props.isOwner ? 'end' : 'start',
      }}
    />
  )
}
