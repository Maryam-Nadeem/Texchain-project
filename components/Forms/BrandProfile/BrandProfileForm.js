import React,{useState,useEffect,} from 'react';
import { Grid, makeStyles} from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';

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
       marginRight:'200px',
       width:'100%'
    },
    buttondiv:{
        paddingLeft: '310px',
        margin: theme.spacing(0.5),
        // padding: theme.spacing(3)
  
    }
  }));

  const initialFValues = {
    user_id: 0,
    user_name: '',
    email: '',
    location: '',
    newUser_name:'',
    newEmail:'',
    newPhone:'0',
    newLocation:''

}

export default function ProfileForm(props){
    const classes=useStyles();
    const {addOrEdit,setOpenPopup,recordForEdit}=props;

    const[userList,setUserList]=useState([]);

    
//const initialFValues = {
    // manu_id: 0,
    // manu_name: '',
    // email: '',
    // location: '',
    // phone:'',
    // description:'',
    // newManu_name:'',
    // newEmail:'',
    // newPhone:'0',
    // newLocation:'',
    // newDescription:''

//}

    const validate = (fieldValues = values) => {
        // console.log('validation success')
        let temp = { ...errors }
        if ('manu_name' in fieldValues)
            temp.manu_name = fieldValues.manu_name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
            // console.log('validation success')
        setErrors({
            ...temp
        })
    
        if (fieldValues == values)
        // console.log(temp)
            return Object.values(temp).every(x => x == "");
            // console.log('validation success')
    }
    

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues , true,validate);

    const editBrand=async(e)=>{

        const id=values.user_id;
        e.preventDefault();
        ({loading:true});
// console.log('ADDED')
        if(id==0){}
        else{
            console.log(id);
            console.log(values.user_name);
            console.log(values.email);
            console.log(values.location);
        
            axios.put('http://localhost:5000/user/updatemanuprofile',
            {user_name:values.user_name,email:values.email,location:values.location,id:id}).then((response)=>{

     
                 setUserList(userList.map((val)=>{
                   return val.user_id === id ?
                    {id:val.user_id,user_name:newUser_name,email:newEmail,location:newLocation}:val;
                 }))
             
                });
            }
            };

            const handleSubmit = e => {
                e.preventDefault()
                
                editBrand(e);
                if (validate()){
                    console.log('success submit2')
                   addOrEdit(values,resetForm);
                   console.log('success submit3')
                   setOpenPopup(false);
                   console.log('success submit1')
                }
                console.log('success submit')
            }

            useEffect(()=>{
                if(recordForEdit!=null)
                setValues({
                    ...recordForEdit.user[0]
                })
            },[recordForEdit])

    return(
        <Form onSubmit={handleSubmit}>
              {console.log( values)}   
        <Grid container direction="row">
        <Grid item xs={6}>
            <Controls.Input
            className={classes.input}
                name="user_name"
                label="Manufacturer Name"
                value={values.user_name}
                onChange={handleInputChange}
                // error={errors.manu_name}
            />
            <Controls.Input
            className={classes.input}
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                // error={errors.email}
            />
            
</Grid>
<Grid item xs={6}>
            <Controls.Input
            className={classes.input}
                label="Phone No"
                name="phone"
                value={"03334256767"}
                onChange={handleInputChange}
                // options={getRoles}
                // error={errors.role_id}
            />
           
            <Controls.Input
            className={classes.input}
                name="location"
                label="Location"
                value={values.location}
                onChange={handleInputChange}
            />
         </Grid>
<Grid item xs={6}>
            <Controls.Input
            className={classes.inputdesc}
                name="description"
                label="Description"
                value={"Famous Clothing Brand"}
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
        </Form>
    )
}