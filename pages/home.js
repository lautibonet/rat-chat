import { useEffect, useState } from 'react'
import Protected from '../auth/protectedRoute'
import UserList from '../components/UserList'
import { getAllUsers } from '../firebase/repository/user'
import CircularProgress from '@mui/material/CircularProgress'
import RatChatAppBar from '../components/RatChatAppBar'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useAuth } from '../auth/authUserProvider'
import getChat from '../firebase/repository/chat'
import { useRouter } from 'next/router'
import RatChatLogo from '../components/RatChatLogo'
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

const Home = () => {
  const [users, setUsers] = useState(null)
  const { authUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    getAllUsers((users) => setUsers(users))
  }, [])

  const onUserClick = (clickedUserEmail) => {
    const fetchChat = async () => {
      const chat = await getChat(authUser.email, clickedUserEmail)
      if (chat) router.push(`/chat/${chat.id}/${clickedUserEmail}`)
    }

    fetchChat().catch((error) => console.log('Could not retrieve chats', error))
  }

  return (
    <Protected>
      <section className="section-content">
        <RatChatAppBar
          leading={<RatChatLogo width={40} height={40} />}
          title={'Rat Chat'}
          trailing={authUser && <UserActions user={authUser} />}
        />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value="1"
            aria-label="All Chats"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All" value="1" />
          </Tabs>
        </Box>

        {users ? (
          <UserList users={users} handleClick={onUserClick} />
        ) : (
          <div className="spinner-container">
            <CircularProgress />
          </div>
        )}
      </section>
    </Protected>
  )
}

export default Home
