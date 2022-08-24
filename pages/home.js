import { useEffect, useState } from 'react'
import Protected from '../auth/protectedRoute'
import UserList from '../components/UserList'
import useUsers, { getAllUsers } from '../firebase/repository/user'
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
import UserActions from '../components/UserAcctions'

const Home = () => {
  const { users } = useUsers()
  const { authUser } = useAuth()
  const router = useRouter()

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
