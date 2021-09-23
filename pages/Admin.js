import React, { Component } from "react";
import AdminMain from '../components/Forms/Admin/AdminMain';
import Admin_SideMenu from '../components/sideMenu/Admin_SideMenu';
import TestHeader from '../components/Headers/TestHeader';
import 'semantic-ui-css/semantic.min.css';
import {CssBaseline, createTheme, ThemeProvider} from '@material-ui/core' ;


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

class AdminPage extends Component{

render(){
    
    return(     
  <>
   <ThemeProvider theme={theme} >
   <Admin_SideMenu/>
   <TestHeader />
   <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
  <AdminMain/>
   </div>
   <CssBaseline />
   </ThemeProvider>
  </>
    )}
};

export default AdminPage;