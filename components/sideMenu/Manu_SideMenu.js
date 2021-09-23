import React from 'react'
import { makeStyles } from "@material-ui/core";
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


const Manu_SideMenu = (props) => {
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
        <Link href="/Manufacturer/Manu_inventory">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Inventory</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Manufacturer/MerchStock">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Merchandizer Stock</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Manu_profile">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Profile</a>
        </Link>
        </h3>

        
        <h3>
        <Link href="/Manufacturer/Requests/BrandOrdertab">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Manage Brand Request</a>
        </Link>
        </h3>

        
        <h3>
        <Link href="/Manufacturer/OrderRawMaterial">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Order Raw Material</a>
        </Link>
        </h3>

      

        <h3>
        <Link href="/Manufacturer/salesorder">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Sales Order</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Manufacturer/SupplierDeliveryStatus">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Supplier Delivery Status</a>
        </Link>
        </h3>

        <h3>
        <Link href="/Manufacturer/Scanner">
          <a  className={classes.h3} style={{textDecoration:'none'}}>Scanner</a>
        </Link>
        </h3>

       

        </div>


        </div>
    )
}

export default Manu_SideMenu;
