//brand sales order with manufacturer
import React from 'react';
import SideMenu from '../../components/sideMenu/Manu_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import {CssBaseline, makeStyles,createTheme, ThemeProvider} from '@material-ui/core' ;
import MSOform from '../../components/Forms/MSO/MSOform'
import { mergeClasses } from '@material-ui/styles';
import Manu_SideMenu from '../../components/sideMenu/Manu_SideMenu';

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


 function MSO() {
  const classes = useStyles();

  return (<div >
  <ThemeProvider theme={theme} >
      <Manu_SideMenu />
      <TestHeader />
      <div className={classes.root} >
      
     <MSOform/>
    </div>
    
    <CssBaseline />
    </ThemeProvider>
    </div>)
}
export default MSO;