import { Box, Card, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './ShowShortURL.css'

const ShowShortURL = () => {
  const params = useParams();
  const [shorturl, setShorturl] = useState('')
  const [showAlert, setShowAlert] = useState({ open: false, error: 'something went wrong' })
  const [data, setData] = useState({})
  const id = params.id
  useEffect(() => {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;
    const URL = `/shorturl/${id}`
    const fetchurl = async () => {
      setShorturl('');
      let url;
      try {
        url = await axios.get(URL).then(res => res.data);
        if (url.success) {
          setData(url.urlentry)
          setShorturl(`${protocol}://${domain}:${port}/${data.hash}`);
          return
        } else {
          console.log('invalid url')
        }
      } catch (error) {
        if (error.response) {
          // Request made but the server responded with an error
          console.log(error.response.data);
          let isSuccess = error.response.data.success;
          if (!isSuccess) {
            document.title = 'Error'
            setShowAlert({ open: true, error: error.response.data.error })
          }
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // Request made but no response is received from the server.
          console.log(error.request);
        } else {
          // Error occured while setting up the request
          console.log('Error', error.message);
        }
      }
    }
    fetchurl()
  }, [id, data.hash])

  const copytext = () => {
    let text = document.getElementById('shorturl').value;
    navigator.clipboard.writeText(text).then(() => console.log('copied'), (err) => {
      console.log(err);
    });

  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert({ open: false, error: '' });
  };
  return (
    <>
      <Card className='short_url'>
        <Typography variant='h4' sx={{ mb: 5 }}>Your shortened URL</Typography>
        <Box className='short_url_box'>
          <input id='shorturl' value={shorturl} readOnly />
          <Tooltip title="Copy URL">
            <IconButton onClick={copytext}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className='links'>
          <Typography>Long URL: <a href={data.url} target='_blank' rel='noreferrer'>{data.url}</a></Typography>
          <Typography>Create another short url <Link to={'/'}>Go Back</Link> </Typography>
        </Box>
      </Card>
      <Snackbar open={showAlert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Please Enter valid url!
        </Alert>
      </Snackbar>
    </>
  )
}

export default ShowShortURL