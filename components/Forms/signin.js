import React,{useEffect, useState} from "react";
import{withRouter} from 'react-router-dom'
import Controls from '../controls/Controls';
// import {makeStyles} from "@material-ui/core";
import { useForm, Form } from '../useForm';
import { Grid ,makeStyles,Paper} from '@material-ui/core';
import Axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
import Main from "../../pages/Main";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(theme => ({
  // root:{
  // [theme.breakpoints.down('md')]: {
  //       width:'100%'
  //     }
  // },
  root: {backgroundColor:'white',
          width:'350px',
          // margin: theme.spacing(10),
          padding: theme.spacing(3),
          marginTop:'100px',
          marginLeft:'180px',
          borderRadius:'10px'
      },
      input:{
        width:'90%',
        margin:'15px'
         
       },
  
  SerachInput:{
      width:'35%'
  },
  newButton:{
      position:'absolute', right:'20px'
  },
  h2:{
    textAlign:'center'
  },
  heading:{
    marginLeft:'100px',
    marginTop:'40px',
  },
  Error:{
    textAlign:'center'

  }

}));

export default function Signin(props){
const classes=useStyles();
    // const[user_name,setUsername]=useState("");
    const[email,setEmail]=useState("");
    // const[loading,setLoading]=useState(false);
    const[password,setPassword]=useState("");
    const[loginStatus,setLoginStatus]=useState("");
    const [role,setRoleId]=useState("");
    let history=useHistory();

   Axios.defaults.withCredentials=true;

    const login=()=>{
    //  setLoading(true); 
      console.log('heelo')
       Axios.post("http://localhost:5000/user/login",{
        //  user_name:user_name,
         email:email,
         password:password  
       }).then((response)=>{
      
           if(response.data.message){
             console.log(response.data.message);
               setLoginStatus(response.data.message);
              //  setLoading(false);
              //  {loginStatus?loginStatus:<Backdrop/>}
              
           } else{
              //  setLoginStatus(response.data[0].email);
            // setLoading(false);
               console.log(response.data[0].email);
               window.location.href='http://localhost:3000/Main'
               
               //window.location.href='http://localhost:3000/Main'
             //history.push('/Main')
           }
        
       });
    };

    

    
    useEffect(()=>{
        Axios.get("http://localhost:5000/user/login").then((response)=>{
          console.log(response);
            if(response.data.loggedIn==true){
              console.log(response.data.user[0].role_id)
        setRoleId(response.data.user[0].role_id);
       
            }
        })
    },[])

    // const action=()=>{
    //   if(role_id=="2"){
    //     <Redirect to='/Main'/>
    //   }
      
    // };

    return(<>
    
 
    <img src="headTex.png" className={classes.heading}></img>
    
<div  className={classes.root}>
  <h2 style={{color:'#253053'}} className={classes.h2}>Login</h2>
        <Form >
    <Grid container>
      <Grid item xs={12}>
    <Controls.Input
    className={classes.input}
       name="email"
       label="Email Address"
       onChange={(e)=>{
           setEmail(e.target.value);
       }}
      //  value={values.name}
      //  error={errors.name}
                    /></Grid>
         <Grid item xs={12}>
        <Controls.Input 
        className={classes.input}
       name="password"
       label="Password"
       type="password"
       onChange={(e)=>{
        setPassword(e.target.value);
    }}
      //  value={values.name}
      //  error={errors.name}
                    /></Grid>
                    <Grid item xs={12}>
                    <h5  style={{color:'red'}} className={classes.Error}>{loginStatus} </h5>
        <Controls.MainButton style={{marginLeft:'115px',marginTop:'30px',backgroundColor:'#253053'}}
            
            text="Sign In"
            onClick={login}
            />
           
        </Grid>
     </Grid>
    </Form></div>
    
    
    </>
    )
}