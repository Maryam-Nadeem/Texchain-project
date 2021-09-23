  
import React,{useEffect,useState} from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton,  makeStyles,useMediaQuery,useTheme } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Axios from 'axios';
import Link from 'next/link';
import Image from "next/image";



const useStyles = makeStyles(theme => ({
        
        appbar:{
            backgroundColor: '#fff',
        //    width:'78%',
        //    marginLeft:'330px',
           
            [theme.breakpoints.down('md')]: {
                marginTop:'0px',
                marginLeft:'0px,',
                width:'100%',
                position:'absolute'
                
                },
        }
    
}))

export default function TestHeader() {
    Axios.defaults.withCredentials=true;
    
    const classes = useStyles();
    const theme=useTheme();
    const isMatch=useMediaQuery(theme.breakpoints.down('md'));
    const [user_name,setUserName]=useState("");

    useEffect(()=>{
        Axios.get("http://localhost:5000/user/login").then((response)=>{
          console.log(response.data)
            if(response.data.loggedIn==true){
              console.log(response.data.user[0])
        setUserName(response.data.user[0].user_name);
        // console.log(response.data.user[0].account_address)
            }
        })
    },[])

    const logout=() => {
        
        Axios.get("http://localhost:5000/user/logout").then((response)=>{
            // window.location.href='http://localhost:3000'
            
        })
    }

    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    
                    <Grid item sm><Image
                      src={'/../public/texbg.png'}
                     
                      // src="/avatar.PNG"
                      priority="true"
                      // layout='fill'
                      width={170}
                      height={60}
                      alt="Picture of the author"
                    /></Grid>
                     
                    <Grid item ><h4 style={{color:'#253053'}}>{user_name}</h4></Grid>
                    <Grid item>
                        <Link href="/">
                        <IconButton
                        onClick={() => logout()}>
                           
                            <ExitToAppIcon fontSize="small" />
                        </IconButton></Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


      // setName(response.data.user[0].user_name);
      // console.log(response.data.user[0].user_name);
      // setEmail(response.data.user[0].email);
      // setLocation(response.data.user[0].location);
      // setUserId(response.data.user[0].user_id);
      // console.log(response.data.user[0].account_address)