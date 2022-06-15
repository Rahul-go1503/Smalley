import { AppBar, Box, Toolbar } from '@mui/material'
import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#232F3D", minHeight: '20vh',justifyContent:'center' }}>
        <Toolbar  className='header'>
            URL Shortner
        </Toolbar>
    </AppBar>
    </Box>
  )
}

export default Header