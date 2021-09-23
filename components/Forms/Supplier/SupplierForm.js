import React,{useState,useEffect} from 'react';
import { Grid ,makeStyles} from '@material-ui/core';
import Controls from '../../controls/Controls';
import { useForm, Form } from '../../useForm';
import Axios from 'axios';
import supplychain from '../../contracts/Supplychain.json'
import Provider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import {useSelector, useDispatch} from 'react-redux';
import { toggleLoading } from "../../../redux/Logger/Logger.actions";

const useStyles = makeStyles(theme => ({
    root:{
        '& .MuiFormControl-root':{
            width:'80%'
        }
    },
    buttondiv:{
        paddingLeft: '200px',
        margin: theme.spacing(1.5),
        // padding: theme.spacing(3)

    },
   
  }));


export default function SuppForm(props){
    const {addOrEdit,setOpenPopup,recordForEdit,privatekey ,user_id}=props;
// get private_key against roleid to run the contracts
const classes = useStyles();
const loadingState = useSelector(state => state.Logger)
const dispatch = useDispatch()
      const initialFValues = {
        
        imageurl:'',
    code:'',
    scanResult:'',
    item_id:0,
    upc:'',
    supplier_name:'',
    longitutde:'',
    latitude:'',
    material:'',
    price:'',
    newPrice:"",
    dye:'',
    image:'',
    ItemCreatedAt:'',
    //user_id:1,
    quantity:'',
    newQuantity:"",
    composition:'',
    privatekey:'a7622f5039081bc387aa1c20a79b9a2d0ef0b4bf640c611024783bf9dc7bc482',

        infuraKey :'wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931'
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("supplier_name" in fieldValues)
          temp.supplier_name = fieldValues.supplier_name
            ? ""
            : "This field is required.";
        if ("product" in fieldValues)
          temp.quantity = fieldValues.quantity ? "" : "This field is required.";
        if ("suser_id" in fieldValues)
          temp.suser_id =
            fieldValues.suser_id != 0 ? "" : "This field is required.";
        if ("longitutde" in fieldValues)
          temp.longitutde =
            fieldValues.longitutde.length != 0 ? "" : "This field is required.";
        setErrors({
          ...temp,
        });
    
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
      };

    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues , true, validate);

    const[userList,setUserList]=useState([]);
const[file,setfile]=useState();
//const data=new FormData(); jn

    const addProduct=async(e)=>{

        const id=values.item_id;
        e.preventDefault();
        if(id==0){
        try{
          dispatch(toggleLoading())
            console.log(user_id)
           
    const accounts = '0x17ca0f60ee0d9126f410dba466a659b3fb751496'
    //console.log(supplychain_contract)
    const supplier_provider= new Provider(privatekey,values.infuraKey);

    const web3s =new Web3(supplier_provider)
    const supplier_contract =  new web3s.eth.Contract(
    (supplychain.abi),'0xCf77731Cb0C5459a5237BEAF5Df65526BE2Ff12a');

    const account= web3s.eth.accounts.privateKeyToAccount(privatekey)
console.log(account.address)
    console.log(values.supplier_name,values.material,values.quantity,values.user_id,values.latitude,values.longitutde)
    const receipt = await supplier_contract.methods.itemBySupplier(values.upc,values.supplier_name,values.latitude,values.longitutde,values.material,values.price,values.quantity).send({
        from: account.address
    })
    console.log(receipt.transactionHash);
    
//     const output=receipt.events.logNewItem
//  const quantity =output.returnValues[0]
//  const sku=output.returnValues[2]
//  const sender=output.returnValues[3]
//  const latitude= output.returnValues[4]
//  const batch=output.returnValues[10]
//  console.log(product.events.logNewItem)
//  addOrEdit(product.transactionHash,resetForm);

console.log(values.file);
console.log(file)
console.log(File)
const data= new FormData()
data.append('file',file)
        data.append('upc',values.upc)
        data.append('user_id',user_id)
        //data.append('ItemCreatedAt',values.ItemCreatedAt)
        data.append('quantity',values.quantity)
        data.append('longitude',values.longitude)
        data.append('latitude',values.latitude)
        data.append('price',values.price)
        data.append('material',values.material)
        console.log(data)

        Axios.post("http://localhost:5000/user/createitem", 
        data
       ).then((res) => {
        dispatch(toggleLoading())
        addOrEdit(values,receipt.transactionHash, resetForm);
         console.log("success");
       }).catch(err=>console.log(err));
     } catch (error) {
       console.log(error);
     }
   } else {
    dispatch(toggleLoading())
     Axios.put("http://localhost:5000/user/updateitem", {
       quantity: values.quantity,
       price: values.price,

       id: id,
     }).then((response) => {
      dispatch(toggleLoading())
       console.log(response);
       console.log(values.quantity);
       setUserList(
         userList.map((val) => {
           return val.item_id === id
             ? { id: val.item_id, quantity: newQuantity, price: newPrice }
             : val;
         })
       );
     });
   }
 };

 


   const handleSubmit = async(e) => {
       e.preventDefault()
    // const data= new FormData()
    // data.append("file",file)
    
    
        // Axios.post("http://localhost:5000/user/createitem", {
        //     upc: values.upc,
        //     user_id:values.user_id,
        //     createdAt:values.createdAt,
        //     quantity:values.quantity,
        //     longitude:values.longitude,
        //     latitude:values.latitude,
        //     price:values.price,
        //     material:values.material,    
        // data})
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err)); jn
      
      try{addProduct(e)
        if (validate()){
            //console.log(values.hash)
            addOrEdit(values.item_id,'Beind Generated',resetForm);
           setOpenPopup(false);
            
        }}
        catch(error){
            console.log(error)
        }
   }

   useEffect(()=>{
       if(recordForEdit!=null)
       setValues({
           ...recordForEdit
       })
   },[recordForEdit])
  

return(

    <Form className={classes.root} onSubmit={handleSubmit}  encType="multipart/form-data" >
            {console.log(privatekey)}
    <Grid container  direction="column"
  justifyContent="center"
  alignItems="stretch">
        <Grid item xs={12}>
            <Controls.Input
                name="supplier_name"
                label="Supplier "
                value={values.supplier_name}
                onChange={handleInputChange}
                error={errors.supplier_name}
            />
           
            
            <Controls.Input
            label="Item UPC"
            name="upc"
            value={values.upc}
            //options={getRoles}// get merch from db
            onChange={handleInputChange}
            error={errors.upc}
        />
        <Controls.Input
                label="latitude"
                name="latitude"
                value={values.latitude}
                onChange={handleInputChange}
            />
        
            </Grid>
            <Grid item xs={12}>
            
           
           
            {/* <Controls.Input
            label="Production Date"
            name="ItemCreatedAt"
            value={values.ItemCreatedAt}
            //options={getRoles}// get merch from db
            onChange={handleInputChange}
            // error={errors.createdAt}
        /> */}
        <Controls.Input
                name="quantity"
                label="Quantity in PCs"
                value={values.quantity}
                onChange={handleInputChange}
                
            />
            <Controls.Input
                name="price"
                label="Price"
                value={values.price}
                onChange={handleInputChange}
                error={errors.price}
            />
            </Grid>
           

    <Grid container>
        <Grid item xs={12}>
           
            
           
        <Controls.Input
        name="material"
        label="Materials used in total ?"
        value={values.material}
        onChange={handleInputChange}
    />
    
    <Controls.Input
        accept=".jpg"
        name="file"
        id="file"
        type="file"
        onChange={(e)=>{
            const file= e.target.files[0];
            setfile(file);
            console.log(file);
        }}
      />
         
    <Controls.Input
    label="Longitude"
    name="longitutde"
    value={values.longitutde}
    onChange={handleInputChange}
    //options={getRoles}// get employees from db
    error={errors.longitutde}
/>
</Grid>
    
            </Grid>

            <div className={classes.buttondiv}>
                <Controls.MainButton
                className={classes.button}
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
)}