

import React from 'react';
import SideMenu from '../../components/sideMenu/Manu_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import {CssBaseline, makeStyles,createTheme, ThemeProvider} from '@material-ui/core' ;
import Manufacturer from '../../components/Forms/Manufacturer/ManuMain' ;


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


 function ManuPage() {
  // const classes = useStyles();

  return (<div >
  <ThemeProvider theme={theme} >
      <SideMenu />
      <TestHeader />
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      
     <Manufacturer  
     />
    </div>
    
    <CssBaseline />
    </ThemeProvider>
    </div>)
}
export default ManuPage;
// style={{ 
//   paddingLeft: '20px',
//   paddingRight: '20px',
//   width: '100%'}} 