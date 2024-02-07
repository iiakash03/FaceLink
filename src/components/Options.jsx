import React from 'react'
import {Button,TextField,Grid,Typography,Container,Paper} from '@material-ui/core'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Assignment,Phone ,PhoneDisabled} from '@material-ui/icons'

import { SocketContext } from '../SocketContext'
import { useContext } from 'react'
import { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
  }));

const Options = ({children}) => {
    const {call,callAccepted,myVideo,userVideo,stream,callEnded,name,me,callUser,leaveCall,answerCall,setName}=useContext(SocketContext);

    const [idToCall,setIdToCall]=useState(''); 
    const classes=useStyles();  
    

  return (
    <Container className={classes.container}>
        <Paper className={classes.paper}>
            <form className='classes.root' noValidate autoComplete='off'>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} md={6} className={classes.padding}>
                        <Typography gutterBottom variant='h6'>Account Info</Typography>
                        <TextField label='Name' value={name} onChange={(e)=>setName(e.target.value)} fullWidth/>
                        <CopyToClipboard text={me} className={classes.margin}>
                            <Button variant="contained" color="primary">Copy to Clipboard</Button>
                        </CopyToClipboard>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.padding}>
                        <Typography gutterBottom variant='h6'>Makoe a call</Typography>
                        <TextField label='Name' value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth/>
                        {callAccepted && !callEnded ? (
                            <Button variant='contained' 
                            color='secondary' className={classes.margin} onClick={leaveCall} fullWidth endIcon={<PhoneDisabled fontSize='large'/>}>
                                Hang Up
                            </Button>
                        ):(
                            <Button variant='contained' color='primary' className={classes.margin} onClick={()=>callUser(idToCall)} fullWidth endIcon={<Phone fontSize='large'/>}>
                                Call
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
            {children}
        </Paper>
    </Container>
  )
}

export default Options
