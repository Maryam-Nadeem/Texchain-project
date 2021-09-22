import React, { useState, map, useContext } from "react";
import PageHeader from "../../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import {  Paper,makeStyles, TextField} from "@material-ui/core";
import Popup from "../../Popup";
import  CustomizedTimeline from '../../Forms/Timeline/prodTimeline'
import { useSelector,useDispatch } from "react-redux";
// import { LoggerContext } from "../../../Contexts/LoggerContext";
import { scanLogger } from "../../../redux/Logger/Logger.actions"
import logger from "redux-logger";
const useStyles = makeStyles(theme => ({
  toolbar:{
  padding:theme.spacing(5),
    marginTop:'15px'
  },
  table:{
   margin:theme.spacing(5),
  },
  root:{
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  camstyle:{
     
    justifyContent:'center',
marginTop:'10px',
  },
  styel:{
    height:'400px',
    width: '400px',
    display:'flex',

  },
  timeline:{
    width:'870px'
  },
  popup:{
    marginTop:'100px'
  }
}));

// import  QrcodeReader from 'react-qr-reader';
const isBrowser = typeof window != 'undefined';

if (isBrowser) {

  var QrReader = require('react-qr-reader');
}


export default function Scan(props) {
//   const scannerLogger=useSelector((state)=>state.Logger)
// console.log(scannerLogger)
//   const dispatch = useDispatch()
  // const Logger=useContext(LoggerContext)

const classes=useStyles();
const [openPopup, setOpenPopup] = useState(false);
const[value,setValue]=useState('')
  const[scan,scanresult]=useState('')



  
 const handlescan=(result)=>{
    if(result){ setOpenPopup(true);
      scanresult(result)
     }
    // setOpenPopup(true);

}

  return (
    <>
    
      <PageHeader

      
        title="SCAN"
        subTitle="Scan Qr Code to know the status of order"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper className={classes.root}>
     
       { isBrowser && (
          <div className={classes.camstyle}>
            <QrReader
            className={classes.styel}
              delay={300}
              onScan={handlescan}   
            />
            {/* <h3>scan result: {scan}</h3> */}

          </div>
        )}
      </Paper>

     
      <Popup
       className={classes.popup}
        title="Story behind your Product"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
      <Paper className={classes.timeline}>
      < CustomizedTimeline/>
      </Paper>
      </Popup>
      
    </>
  );
}
