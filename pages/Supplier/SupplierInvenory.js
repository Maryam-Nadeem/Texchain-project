import React from "react";
import 'semantic-ui-css/semantic.min.css';
import SideMenu from '../../components/sideMenu/Supp_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import {CssBaseline,createTheme, ThemeProvider} from '@material-ui/core' ;

import Supplier from "../../components/Forms/Supplier/SupplierMain";
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
function SuppPage(props){
console.log(props.userLogin)

   
        return(
            <div >
            <ThemeProvider theme={theme} >
                <SideMenu />
                <TestHeader />
                <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
                {console.log(props.userLogin)}
               <Supplier userlogin={props.userLogin} 
               />
              </div>
              
              <CssBaseline />
              </ThemeProvider>
              </div>
        );
    
   }

   export default SuppPage;