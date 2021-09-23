
import {CssBaseline, makeStyles,createTheme, ThemeProvider} from '@material-ui/core';
// // const mysql=require('mysql');
// // import Route from 'react-dom';
// import AdminPage from '../pages/Admin';
import React,{useState} from "react";
import Controls from '../components/controls/Controls';
// import {makeStyles} from "@material-ui/core";

import { Grid } from '@material-ui/core';
import Signin from '../components/Forms/signin';

//import {BrowserRouter as Router, Route} from "react-router-dom";




const useStyles = makeStyles({
  appMain: {
    
    width: '100%'
  }
})

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



function App() {
  const classes = useStyles();
  const [openPopup,setOpenPopup]=useState(false);
  
  


  return (<>
  {/* <Router history={history}>
                <Switch>
                    <Route path="/" exact component={index} />
                    <Route path="/Main" component={Main} />
                    <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} />
                </Switch>
            </Router> */}
            <ThemeProvider theme={theme} >
    <div className={classes.appMain}>
      <Grid container>
        <Grid item={12} >
            <img src="build.jpeg" height="753px" width="800px"></img></Grid>
        <Grid item={12}>
            
      
      {/* <Controls.MainButton    
      // style={{marginRight:'50px'}}
      // className={classes.signinButton}
      type="submit"
      text="Get Started"
      style={{marginRight:'10px'}}
   
      onClick={()=>{setOpenPopup(true)}}/> */}
      {/* <MainButton 
      type="submit"
      text="Action"></MainButton> */}
      <Signin setOpenPopup={setOpenPopup}/></Grid>
  </Grid>
      </div>


  
      {/* <Popup style={{align:'center'}}
                title="Sign In"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
      >
      <Signin setOpenPopup={setOpenPopup}/>
      </Popup> */}
       <CssBaseline />
      </ThemeProvider>
      </>
    
  );
}

export default App;

{/* <ThemeProvider theme={theme} >
      <SideMenu />
      
      <div style={{paddingLeft: '320px',width: '100%'}} >
      <TestHeader/>
     <Inventory />
    </div>
    <Route exact path='/Admins' component={AdminPage}></Route>
    <CssBaseline />
    </ThemeProvider> */}
