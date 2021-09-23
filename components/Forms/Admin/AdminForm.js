import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { abi } from "../../contracts/AdminUser.json";
import { useForm, Form } from "../../useForm";
import Provider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import Axios from "axios";
import Notification from '../../Notification';

import {useSelector, useDispatch} from 'react-redux';
import { toggleLoading } from "../../../redux/Logger/Logger.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    //     '& .MuiFormControl-root':{
    //     width:'100%'
    // }
  },
  input: {
    width: "90%",
    margin: "15px",
  },
  inputloc: {
    marginLeft: "200px",
    width: "100%",
  },
  buttondiv: {
    paddingLeft: "310px",
    margin: theme.spacing(0.5),
    // padding: theme.spacing(3)
  },
}));

export default function AdminForm(props) {
  const { addOrEdit, setOpenPopup, recordForEdit } = props;
  const classes = useStyles();
  const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
  //const[loading,setLoading]=useState(false);
  const loadingState = useSelector(state => state.Logger)
  const dispatch = useDispatch()

  const getRoles = [
    { id: "1", title: "Manufacturer" },
    { id: "2", title: "Supplier" },
    { id: "3", title: "Brand" },
    { id: "4", title: "Admin" },
  ];

  const initialFValues = {
    user_id: 0,
    user_name: "",
    password: "",
    role_id: "",
    data: [],
    newData: [],
    account_address: "",
    hash: "",
    newHash: "",
    user_contract: "",
    loading: false,
    newLoading: "",
    email: "",
    location: "",
    newName: "",
    newPassword: "",
    newRole: "0",
    newAccountAddress: "",
    newEmail: "",
    newLocation: "",
    privateKey:
      "5a480f5bffd12f0561a13d60c1314d2f9c237f84a3c7fffd168f910fa8719ebf",
    infuraKey: "wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931",

    // date: new Date()
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("user_name" in fieldValues)
      temp.user_name = fieldValues.user_name ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 8 ? "" : "Minimum 8 numbers required.";
    if ("role_id" in fieldValues)
      temp.role_id =
        fieldValues.role_id.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const [userList, setUserList] = useState([]);

  const addUser = async(e) => {
    const id = values.user_id;
    e.preventDefault();
   

    if (id == 0) {
      try {
// setLoading(true)
dispatch(toggleLoading())
            const admin_provider= new Provider(values.privateKey,values.infuraKey)
            const web3a =new Web3(admin_provider)
            const admin_contract =  new web3a.eth.Contract(
            (abi),'0x9898BA4F1157E3E86490C68E8b498fB1009477dD');
            const accounts = '0x1a4779bf314b45bc7f93c09f9de0a3b5e8f6fab2';
            
           //const account= web3a.eth.accounts.privateKeyToAccount('9ad55ba5bbefece176836f98bc15d15fdab54eecc7ba8f6e76d8e70fec27610c')
           
            const reciept = await admin_contract.methods.setUser(values.account_address,values.user_name,values.password,values.email,values.location,values.role_id).send({
              from:accounts
            });
            //console.log(reciept.transactionHash)
            //console.log(reciept)
            const log =reciept.events.LogNewUser.returnValues[6];
    
             ({hash:log})
            const output =await  admin_contract.methods.getdata(log).call();
            console.log(output)
            const {us_name,email,location,password,role,Createdby}= output
            // // setUserList({
            //   user_name: us_name,
            //   email: email,
            //   location: location,
            //   password:password,
            //   role_id: role,
            //   account_address: Createdby
            // });
            // console.log({userList})
            // ({userList:setUserList});
            // console.log({data})
            
        Axios.post("http://localhost:5000/user/createuser", {
          user_name: values.user_name,
          password: values.password,
          role_id: values.role_id,
          account_address: values.account_address,
          privatekey: values.privatekey,
          email: values.email,
          location: values.location,
          // date:values.date
        }).then(() => {
          // setLoading(false);
          dispatch(toggleLoading())
          addOrEdit(values, resetForm);
          console.log("success");
        });

        
      } catch (error) {
        console.log(error);
      }
    } else {
      
      dispatch(toggleLoading())
      
      Axios.put("http://localhost:5000/user/updateuser", {
        account_address: values.account_address,
        location: values.location,
        id: id,
      }).then((response) => {
        dispatch(toggleLoading())
      //   setNotify({
      //     isOpen:true,
      //     message:'Updated Succesfully',
      //     type:'success'
      // });
        console.log(response);
        
        setUserList(
          userList.map((val) => {
            return val.user_id === id
              ? {
                  id: val.user_id,
                  account_address: newAccountAddress,
                  location: newLocation,
                }
              : val;
          })
          
        );
        
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    addUser(e);
    if (validate()) {
      //console.log(values.hash);
      addOrEdit(values.user_id,resetForm);
  
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (<>
    <Form onSubmit={handleSubmit} className={classes.root}>
      
      <Grid container direction="row">
        <Grid item xs={6}>
          <Controls.Input
            className={classes.input}
            name="user_name"
            label="User Name"
            value={values.user_name}
            onChange={handleInputChange}
            error={errors.user_name}
          />
          <Controls.Input
            className={classes.input}
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Input 
            className={classes.input}
            label="Password"
            name="password"
            
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <Controls.Select
            className={classes.input}
            label="Role"
            name="role_id"
            value={values.role_id}
            onChange={handleInputChange}
            options={getRoles}
            error={errors.role_id}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            className={classes.input}
            label="Account Address"
            name="account_address"
            value={values.account_address}
            onChange={handleInputChange}
          />{" "}
          <Controls.Input
            className={classes.inputloc}
            name="location"
            label="Location"
            value={values.location}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            className={classes.input}
            label="Private Address"
            name="privatekey"
            value={values.privatekey}
            onChange={handleInputChange}
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
      <Notification
              notify={notify}
              setNotify={setNotify}
            />
    </Form></>
    
  );
}
