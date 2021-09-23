

import React from 'react';
import SideMenu from '../../components/sideMenu/Supp_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import {CssBaseline, makeStyles,createTheme, ThemeProvider} from '@material-ui/core' ;
import SSOform from '../../components/Forms/SSOSUPPLIER/SSOform';


const theme = createTheme({
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

const useStyles = makeStyles((theme) => ({
  root:{
    paddingLeft: '330px',width: '100%',paddingRight: '10px'
  }
}))


 function Order() {
  const classes = useStyles();

  return (<div >
  <ThemeProvider theme={theme} >
      <SideMenu />
      <TestHeader />
      <div className={classes.root} >
      
     <SSOform  />
    </div>
    
    <CssBaseline />
    </ThemeProvider>
    </div>)
}
export default Order;
// style={{ 
//   paddingLeft: '20px',
//   paddingRight: '20px',
//   width: '100%'}} 