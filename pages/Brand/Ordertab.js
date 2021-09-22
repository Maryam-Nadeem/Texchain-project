import React, { useState, useEffect } from "react";
import { Grid ,makeStyles,Paper,Icon} from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import TextField from "@material-ui/core/TextField";
import Notification from '../../components/Notification';
import TestHeader from "../../components/Headers/TestHeader";
import Brand_SideMenu from "../../components/sideMenu/Brand_SideMenu";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
  // root:{
  // [theme.breakpoints.down('md')]: {
  //       width:'100%'
  //     }
  // },
  root: {
      // '.MuiFormControl-root':{width:'80%'},
          marginLeft:'180px',
          marginTop:'30px',
          padding: theme.spacing(5),
          width:'70%'
      },
  inputD:{
    margin:'10px',
    width:'100%',
  },
  inputT:{
  marginLeft:'100px',

  marginTop:'10px'
 
  },
  buttonB:{
    marginLeft:'150px'
  },
  profile:{
    marginLeft:'60px',
    margin: theme.spacing(3),
    padding: theme.spacing(1),
    width:'90%'
    
  },
  ptag:{
    fontSize:'large',
    marginLeft:'240px',
    color:'#62656c'
  },
  htag:{
    marginLeft:'30px',
    color:'#4c5058'
  }
}));

export default function ManuOrderDetailsForm(props) {
  const { material, upc } = props;
  const classes = useStyles();
  const initialFValues = {
    
    description: "",
    
    infuraKey: "wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("merchandizer" in fieldValues)
      temp.merchandizer = fieldValues.merchandizer
        ? ""
        : "This field is required.";
    if ("quantity" in fieldValues)
      temp.quantity = fieldValues.quantity ? "" : "This field is required.";
    if ("desc" in fieldValues)
      temp.desc = fieldValues.desc ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const [users, setUsers] = useState([]);
  const [file, setfile] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const newRequest = async (e) => {
    e.preventDefault();
    
        try {
          console.log();
          const data= new FormData();
        
          data.append('file',file)
          data.append('description',values.description)
          data.append('user_id',36)
          axios.post("http://localhost:5000/user/createbrandorder", 
         data
        ).then((res) => {
          
          console.log("success");
          setNotify({
            isOpen:true,
            message:'Order Placed Succesfully',
            type:'success'
        });
        }).catch(err=>console.log(err));
        
        }
          catch (error) {
            console.log(error);
          }
        
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      newRequest(e);   
      if (validate()) {
        console.log('validates')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
       <Brand_SideMenu />
      <TestHeader />
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      <PageHeader
        title="Order Products"
        subTitle="Order products from manufacturer"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.profile}>
        <h2 className={classes.htag}>Zillion Exports</h2>
        <hr/>
        <p className={classes.ptag}><LocationOnIcon/>&emsp; Karachi &emsp; &emsp; &emsp; 
        <PhoneIcon/>&emsp;0334-3355821 &emsp; &emsp; &emsp;
        <EmailIcon/>&emsp;zillion@gmail.com</p>
        
      </Paper>
<Paper className={classes.root}>
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Order Form</h2>
      <hr/>
      <Grid container  >
        <Grid item xs={12} className={classes.inputT}>
          <Controls.Input
         className={classes.inputD}
            label="Order Description"
            name="description"
            value={props.description}
            onChange={handleInputChange}
           
          />
          <Controls.Input
           className={classes.inputD}
          accept=".doc"
          name="file"
          id="file"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setfile(file);
            console.log(file);
          }}
        />

          
       
        
        <div className={classes.buttonB}>
          <Controls.MainButton
            type="submit"
            text="Submit"
            onClick={handleSubmit}
          />
          <Controls.MainButton
            text="Reset"
            color="default"
            onClick={resetForm}
          />
        </div>
      </Grid> 
      </Grid>
    </Form></Paper></div>
    <Notification notify={notify} setNotify={setNotify} />
    </div>
    
    
  );
}
