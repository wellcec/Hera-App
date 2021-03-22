import React, { useState } from 'react'

import {
  Box,
  Menu,
  MenuItem,
  Container,
  makeStyles,
  IconButton,
  Typography,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { useConfig } from '../Context'

const useStyles = makeStyles(() => ({
  header: {
    height: 40,
  },
  iconAccount: {
    color: '#ffffff',
    fontSize: 35,
  },
}))

const Header = () => {
  const classes = useStyles()
  const { auth, setAuth, user, setUser } = useConfig()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
   sessionStorage.removeItem('auth')
   setAuth(false)
   setUser({})
  }

  return (
    <>
      <Container className={classes.header}>
        <Box textAlign="right" py={2}>
          {auth && (
            <Box>
              <Typography component="span" color="secondary" className={classes.title}>Olá { user?.username }!</Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.iconAccount} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Header
