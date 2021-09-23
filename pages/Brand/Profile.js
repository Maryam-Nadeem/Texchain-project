import React, { useState,useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Container,Icon} from 'semantic-ui-react';
import Brand_SideMenu from '../../components/sideMenu/Brand_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import PageHeader from '../../components/PageHeader';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Controls from '../../components/controls/Controls';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import BrandProfileForm from "../../components/Forms/BrandProfile/BrandProfileForm";
import Popup from '../../components/Popup';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Paper,makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  // root:{
  // [theme.breakpoints.down('md')]: {
  //       width:'100%'
  //     }
  // },
  root: {
      
          margin: theme.spacing(5),
          padding: theme.spacing(1)
      }
}));



  function BrandProfile(){
    const classes = useStyles();
    axios.defaults.withCredentials=true;
    const [users,setUsers]=useState([]);
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
    const[confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
    const [user_name,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [location,setLocation]=useState("");

    useEffect(()=>{
      axios.get("http://localhost:5000/user/login").then((response)=>{
        console.log(response.data)
          if(response.data.loggedIn==true){
            console.log(response.data)
            setUsers(response.data);
      setUserName(response.data.user[0].user_name);
      setEmail(response.data.user[0].email);
      setLocation(response.data.user[0].location);
      // console.log(response.data.user[0].account_address)
          }
      })
  },[])

    const openInPopup=item=>{
      setRecordForEdit(item);
      setOpenPopup(true);
  }

  const addOrEdit=(user,resetForm)=>{
    console.log(user)
    setOpenPopup(false);
    //setOpenPopup(false);
    // if(user.id!=0)
    //    {updateUser();}
    setNotify({
        isOpen:true,
        message:'Submitted Successfully',
        type:'success'
    });
    setRecordForEdit(null);
    resetForm;

}

   
      return(
      
        
      <div className='outerBox'>
{console.log(users)}
        <Brand_SideMenu/>
        <TestHeader/>
        <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
        <PageHeader
                title="Profile"
                subTitle="Edit profile of your Brand"
                icon={<AccountBoxIcon fontSize="large" />}
              />
         
          
           <Container style={{width:'800px'}}>
            <Paper className={classes.root}>
          <div style={{marginTop:'70px',marginLeft:'30px'}}>
            {/* <img src="Jeans-Brands-8.png" /> */}
            {/* <Image
                      src={'/../../public/Jeans-Brands-8.png'}
                     
                      // src="/avatar.PNG"
                      priority="true"
                      // layout='fill'
                      width={170}
                      height={60}
                      alt="Picture of the author"
                    /> */}
          <h1>{user_name}</h1><hr/>
          <p style={{fontSize:'18px'}}>Famous Clothing brand</p>
          <p style={{fontSize:'18px'}}><Icon name='map marker alternate'/><span style={{paddingLeft:'30px'}}/>{location}</p>
          <p style={{fontSize:'18px'}}><Icon name='phone'/><span style={{paddingLeft:'25px'}}/>03334256767</p>
          <p style={{fontSize:'18px'}}><Icon name='mail'/><span style={{paddingLeft:'20px'}}/>{email}</p>
          </div>

          <Controls.MainButton 
            style={{marginLeft:'320px',marginTop:'50px',marginBottom:'30px'}}
          text="Edit Profile" 
          variant="outlined" 
          startIcon={<EditIcon/>}
          onClick={()=>{openInPopup(users)}}
         /></Paper>
            </Container>

        
        </div>
        <Popup
              title="Profile Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <BrandProfileForm
               addOrEdit={addOrEdit}
               setOpenPopup={setOpenPopup}
               recordForEdit={recordForEdit}
            />
            </Popup>
            <Notification
              notify={notify}
              setNotify={setNotify}
            />
            <ConfirmDialog
             confirmDialog={confirmDialog}
             setConfirmDialog={setConfirmDialog}
             />
      </div>
      )
    }

    export default BrandProfile;