import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { useState } from 'react'
import useFirebaseAuth from '../auth/firebaseAuth'

const UserActions = (props) => {
  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleOpenUserMenu = (event) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setMenuAnchor(null)
  }

  const { logout } = useFirebaseAuth()

  return (
    <>
      <Tooltip title={props.user.displayName}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={props.user.displayName}
            src={props.user.photoURL}
            referrerPolicy="no-referrer"
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(menuAnchor)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <span onClick={() => logout()}>Logout</span>
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserActions
