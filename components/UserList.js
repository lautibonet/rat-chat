import { List } from '@mui/material'
import useFirebaseAuth from '../auth/firebaseAuth'
import UserItem from './UserItem'

const UserList = ({ users, handleClick }) => {
  const { authUser } = useFirebaseAuth()
  return (
    <List>
      {authUser &&
        users &&
        users.map(
          (user) =>
            authUser.email !== user.email && (
              <UserItem
                key={user.id}
                photoURL={user.photoURL}
                displayName={user.displayName}
                email={user.email}
                handleClick={handleClick}
              />
            )
        )}
    </List>
  )
}

export default UserList
