import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";
import Link from 'next/link';
import { mergeClasses } from '@material-ui/styles';

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
   marginTop:'120px',
   padding:'40px'
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


const Brand_SideMenu = (props) => {
    //const { classes } = props;
    const classes=useStyles();
    return (
        <div className={classes.root} >
            {/* <img src="logo2.PNG" height="85px" width="250px" style={{marginLeft:'40px'}}></img> */}

<div className={classes.content}>
        <h3 >
        <Link href="/Brand/Ordertab">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Order Products</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Brand/SalesOrder">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Purchase Orders</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Brand/Profile">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Profile</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Brand/Scanner">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Scanner</a>
        </Link>
        </h3>

        
        {/* <h3>
        <Link href="/Manu_profile">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Brand Request</a>
        </Link>
        </h3> */}

        
        

       

        </div>


        </div>
    )
}

export default Brand_SideMenu;