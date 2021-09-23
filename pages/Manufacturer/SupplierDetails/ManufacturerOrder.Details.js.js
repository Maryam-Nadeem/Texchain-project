import React, { useState, useEffect } from "react";
import { Grid ,makeStyles} from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";
import TextField from "@material-ui/core/TextField";
import supplychain_contract from "../../../components/Forms/factory";
import Notification from "../../../components/Notification";
import {useSelector, useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
  root:{
    
    padding: theme.spacing(0.5)
      //     '& .MuiFormControl-root':{
      //     width:'100%'
      // }
  },
  input:{
   width:'90%',
   margin:'15px'
    
  },
  inputdesc:{
    width:'120%',
    marginLeft:'180px',
    margin:'15px'
  },
  buttondiv:{
      paddingLeft: '310px',
      margin: theme.spacing(0.5),
      // padding: theme.spacing(3)

  }
}));


import axios from "axios";
import { getReq, toggleCartHidden, togglefLAG } from "../../../redux/item/item.actions";

export default function ManuOrderDetailsForm(props) {
  const { addOrEdit} = props;
  const userlogin = useSelector(state => state.item)
  const dispatch = useDispatch()
  axios.defaults.withCredentials=true;
  const [user_id,setUserId]=useState("");
  const { material, upc } = props;
const classes = useStyles();
  const initialFValues = {
    merchandizer: "",
    desc: "",
    quantity: "",
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

 
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(()=>{
    axios.get("http://localhost:5000/user/login").then((response)=>{
      console.log(response.data)
        if(response.data.loggedIn==true){
          console.log(response.data.user[0])
    setUserId(response.data.user[0].user_id);
    // console.log(response.data.user[0].account_address)
        }
    })
},[])

  const addUser = async (e) => {
    const response = await supplychain_contract.methods
      .orderByManufacturer(values.desc)
      .call();
    console.log(response.transactionHash);
    addOrEdit(response.transactionHash,resetForm)
    console.log(response.transactionHash);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(e);
    axios
      .post("http://localhost:5000/user/createrequestmanu", {
        upc: props.upc,
        merchandizer: values.merchandizer,
        material: props.material,
        description: values.desc,
        Suser_id:props.Suser_id,//supplier user_id
        user_id: user_id, //57 - Manufacturer id
        quantity: values.quantity,
      })
      .then((response) => {
        axios.get("http://localhost:5000/user/getlastid").then((response)=>{
          console.log(response.data[0].req_id)
          dispatch(getReq(response.data[0].req_id))
        // console.log(response.data.user[0].account_address)
            
        })
        
       
        setUsers(response.data);
        
      
      });
  };

  return (
    <div>
    <Form className={classes.root}>
      { console.log(userlogin.flag)}
      <Grid container  direction="row">
        <Grid item xs={6}>
          <Controls.Input
           className={classes.input}
            label="Raw Material"
            name="material"
            value={props.material}
            onChange={handleInputChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
          <Controls.Input
          className={classes.input}
            name="upc"
            label="Item Code"
            value={props.upc}
            onChange={handleInputChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />

        </Grid>
        <Grid item xs={6}>

        <Controls.Input
        className={classes.input}
            label="Merchandizer"
            name="merchandizer"
            value={values.merchandizer}
            onChange={handleInputChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />

          <Controls.Input
          className={classes.input}
            id="standard-number"
            label="Quantity in PCs"
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleInputChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
          </Grid>
          <Grid item xs={6}>
          <Controls.Input
          className={classes.inputdesc}
            label="Let us know your Requirements "
            name="desc"
            value={values.desc}
            onChange={handleInputChange}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        </Grid>

        <div className={classes.buttondiv}>
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
    </Form>
    <Notification notify={notify} setNotify={setNotify} />
    </div>
    
    
  );
}
