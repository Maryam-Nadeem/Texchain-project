import React,{useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import Axios from 'axios';


const useStyles = makeStyles(theme => ({
   input:{
       width:'50%',
    marginRight:'10px'
   },
   button:{
       marginLeft:'120px'
   }
  }));

export default function MerchForm(props){
    const { addOrEdit, setOpenPopup, recordForEdit } = props;
    const classes=useStyles();
    //const [openPopup,setOpenPopup]=useState(false);
    //const [recordForEdit,setRecordForEdit]=useState(null);
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
   
    const initialFValues = {
        item_left:"",
        newItemLeft:"",
        stock_id:0
}


const[userList,setUserList]=useState([]);

const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('item_left' in fieldValues)
        temp._item_left = fieldValues.item_left ? "" : "This field is required."
   
    setErrors({
        ...temp
    })

    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
}

const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
} = useForm(initialFValues , true,validate);

const updateItemLeft=(e)=>{
      const id=values.stock_id;
       e.preventDefault();
 
    console.log(id);
    console.log(values.item_left);
    Axios.put("http://localhost:5000/user/updateItemLeft",
   {
    item_left:values.item_left,
    id:id,})
    .then((response)=>{
        console.log(response);
        setUserList(userList.map((val)=>{
          return val.stock_id === id ? {id:val.stock_id,item_left:newItemLeft}:val;
        }))
       });
    }

    
      
    

    const openInPopup=item=>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }
      
       const handleSubmit = async(e) => {
        //    try{
        e.preventDefault()
        updateItemLeft(e)
    addOrEdit(values.item_left,resetForm)
        setOpenPopup(false);
    }
    //     catch(error){
    //         console.log(error)
    //     }
    //    }

       useEffect(()=>{
        if(recordForEdit!=null)
        setValues({
            ...recordForEdit
        })
    },[recordForEdit])
       return(
        <Form onSubmit={handleSubmit}>  
         <Controls.Input className={classes.input}
         
         type="number"
                name="item_left"
                label="Item Left"
                value={values.item_left}
                onChange={handleInputChange}
            />
              <Controls.MainButton
              className={classes.button}
                    type="submit"
                    text="Submit"
                    onClick={handleSubmit} 
                    />
        </Form>
       )

       

}