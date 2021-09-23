
import React from 'react';
import Admin_SideMenu from '../components/sideMenu/Admin_SideMenu';
import TestHeader from '../components/Headers/TestHeader';
import Inventory from '../components/TestForm/Inventory';
import {CssBaseline, makeStyles,createMuiTheme, ThemeProvider} from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   signinButton: {
//    marginLeft:'1100px',
//    marginBottom:'10px'
//   }
// }))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    }
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  }
})


export default function LandingPage() {
  // const classes = useStyles();

  return (<div >
  <ThemeProvider theme={theme} >
      <Admin_SideMenu />
      <TestHeader />
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      
     <Inventory  
     />
    </div>
    {/* <Route exact path='/Admins' component={AdminPage}></Route> */}
    <CssBaseline />
    </ThemeProvider>
    </div>)
}
// style={{ 
//   paddingLeft: '20px',
//   paddingRight: '20px',
//   width: '100%'}} 