import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const RatChatAppBar = (props) => {
  const appBarStyles = {
    display: 'flex',
    padding: '0 16px',
  }

  return (
    <AppBar
      position="static"
      style={appBarStyles}
      sx={{
        backgroundColor: 'transparent',
      }}
      elevation={props.elevation || 0}
    >
      <Toolbar disableGutters>
        {props.leading}
        <Typography
          variant="h6"
          sx={{
            color: 'primary.main',
            margin: 'auto',
          }}
        >
          {props.title ?? 'No Title'}
        </Typography>

        {props.trailing}
        <Box sx={{ flexGrow: 0 }}></Box>
      </Toolbar>
    </AppBar>
  )
}

export default RatChatAppBar
