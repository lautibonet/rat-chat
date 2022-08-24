import { ListItem } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const UserItem = ({ photoURL, displayName, email, handleClick }) => {
  return (
    <ListItem disablePadding secondaryAction={<KeyboardArrowRightIcon />}>
      <ListItemButton onClick={() => handleClick(email)}>
        <ListItemAvatar>
          <Avatar
            alt={displayName}
            src={photoURL}
            referrerPolicy="no-referrer"
          />
        </ListItemAvatar>
        <ListItemText primary={displayName} secondary={email} />
      </ListItemButton>
    </ListItem>
  )
}

export default UserItem
