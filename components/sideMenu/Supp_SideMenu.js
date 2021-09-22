import React from "react";
import {
  makeStyles,
  withStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Link from "next/link";
import SuppDrawer from "../Drawer/supp_drawer";
// import useWindowDimensions from "../windowSize";

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



// const useStyles = makeStyles((theme) => ({
//   sidemanu: {
//     display: "flex",
//     flexDirection: "column",
//     position: "absolute",
//     left: "0px",
//     width: "320px",
//     height: "100vh",
//     backgroundColor: "#253053",

//     // [theme.breakpoints.down("sm")]: {
//     //   backgroundColor: "cyan",
//     //   width: "150px",
//     //   height: "150%",
//     // },
//     // [theme.breakpoints.down('md')]: {
//     //   backgroundColor: 'red',
//     // },
//     // [theme.breakpoints.down('xl')]: {
//     //   backgroundColor: 'black',
//     // },
//     // [theme.breakpoints.up('xl')]: {
//     //   backgroundColor: 'cyan',
//     // },
//   },
//   namediv:{
//     marginLeft: "30px",
//            marginTop: "100px",
//            color: "#5ce1e6",
//            padding: "40px",
//   }
// }));

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

const Supp_SideMenu = (props) => {
  const classes = useStyles();
  // const{height,width}=useWindowDimensions();

  //Breakpoints
  const theme=useTheme();
  const isMatch=useMediaQuery(theme.breakpoints.down('md'));
  

  return (
    <>
      
      {/* <img
        src="logo2.PNG"
        height="85px"
        width="250px"
        style={{ marginLeft: "40px" }}
      ></img> */}
      {/* {isMatch ? <SuppDrawer/>:( */}
        <div className={classes.root} >
        
         <div className={classes.content}
        //  style={{
        //    marginLeft: "30px",
        //    marginTop: "100px",
        //    color: "#5ce1e6",
        //    padding: "40px",
        //  }}
       >
         <h3>
           <Link href="/Supplier/SupplierInvenory">
             <a className={classes.h3} style={{textDecoration:'none'}}>Manage Products</a>
           </Link>
         </h3>
         <h3>
           <Link href="/Supplier/OrderByManufacturer">
           <a className={classes.h3} style={{textDecoration:'none'}}>Manage Request</a>
           </Link>
         </h3>
         <h3>
           <Link href="/Supplier/SSO">
           <a className={classes.h3} style={{textDecoration:'none'}}>Sales Order</a>
           </Link>
         </h3>
       </div>
       </div>
{/* )} */}
      
      </>
  );
  
};

export default Supp_SideMenu;
