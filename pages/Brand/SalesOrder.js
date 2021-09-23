

import React from 'react';
import Brand_SideMenu from '../../components/sideMenu/Brand_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import {CssBaseline, makeStyles,createTheme, ThemeProvider} from '@material-ui/core' ;
import BrandSALESORDER from '../../components/Forms/brandsalesorder/salesorder';

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


 function Order() {
  // const classes = useStyles();

  return (<div >
  <ThemeProvider theme={theme} >
      <Brand_SideMenu />
      <TestHeader />
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      
     <BrandSALESORDER  
     />
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