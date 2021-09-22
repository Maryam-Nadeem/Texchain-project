import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";
import Link from 'next/link';

// withStyles & makeStyles

// const style = {
//     sideMenu: {
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'absolute',
//         left: '0px',
//         width: '320px',
//         height: '100%',
//         backgroundColor: '#253053'
//     }
// }

const useStyles = makeStyles(theme => ({
  content:{
  
   marginLeft:'30px',
    marginTop:'180px',
    padding:'20px'
  },
  root:{
   display: 'flex',
   flexDirection: 'column',
   position: 'fixed',
   left: '0px',
   width: '320px',
   height: '100%',
   backgroundColor: '#253053'
  },
  h3:{
   color:'#5ce1e6',
   padding:theme.spacing(1)
   
  }
 }));

const Admin_SideMenu = (props) => {
    //const { classes } = props;
    const classes=useStyles();
    return (
      <div className={classes.root} 
      // style={{
      //     display: 'flex',
      //     flexDirection: 'column',
      //     position: 'absolute',
      //     left: '0px',
      //     width: '320px',
      //     height: '100%',
      //     backgroundColor: '#253053'
      // }}
      >
          {/* <img src="logo2.PNG" height="85px" width="250px" style={{marginLeft:'40px'}}></img> */}

<div className={classes.content}>
      <h3 >
      <Link href="/Admin">
        <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Users</a>
      </Link>
      </h3>

      <h3>
      <Link href="/AdminDoc">
        <a  className={classes.h3} style={{textDecoration:'none'}}>Company Profile</a>
      </Link>
      </h3>

     

      </div>
      </div>
    )
}

export default Admin_SideMenu;
