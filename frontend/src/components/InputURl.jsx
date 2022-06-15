import React, { useState } from 'react'
import './InputURI.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const InputURl = () => {
    const [url, setUrl] = useState('')
    const history = useNavigate();
    function gethash() {
        var ranSubStr1 = Math.random().toString(32).substring(2, 5);
        var ranSubStr2 = Math.random().toString(32).substring(2, 5);
        var random_string = ranSubStr1 + ranSubStr2;
        return random_string
    }
    const submithandler = async () => {
        // const protocol = window.location.protocol;
        // const domain = window.location.hostname;
        // const port = window.location.port;
        // let backurl = `${protocol}://${domain}:${4000}/addurl`
        let backurl = `/addurl`
        let hash = gethash();
        if (!url) {
            setOpen(true);
            return
        }
        const resdata = await axios.post(backurl, {
            url, hash
        }).then(res => res.data)
        // console.log(resdata);
        history(`shorturl/${resdata._id}`);
    }


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <>
            <Card className="url_box">
                <Typography variant='h4' sx={{ mb: 5 }}>Paste the URL to be shortened</Typography>
                <input type='text' placeholder='Enter your url' value={url} onChange={(e) => setUrl(e.target.value)}></input>
                <Button onClick={submithandler}>Continue</Button>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                    Please Enter valid url!
                </Alert>
            </Snackbar>
        </>
    )
}

export default InputURl