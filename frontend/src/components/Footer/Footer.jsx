import { Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <>
    <Box sx={{display:'flex',alignItems:'center',mt:5}}>
    <Typography>Made with <FavoriteIcon sx={{color : 'red',fontSize:'1em'}}/> by Rahul</Typography>
    </Box>
    </>
  )
}

export default Footer