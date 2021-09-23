import React,{useState} from 'react';
import PageHeader from '../components/PageHeader';
import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar,Grid } from '@material-ui/core';
import Admin_SideMenu from '../components/sideMenu/Admin_SideMenu';
import TestHeader from '../components/Headers/TestHeader';
import {CssBaseline,createTheme, ThemeProvider} from '@material-ui/core' ;
import PeopleOutlineTwoToneIcon from '@material-ui/icons/AccountBalance';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Form } from "../components/useForm";
import Controls from "../components/controls/Controls";
import Notification from '../components/Notification';
import Popup from '../components/Popup';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import useTable from "../components/useTable";
import ConfirmDialog from '../components/ConfirmDialog';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const headCells=[
  {id:'documents', label: 'Company Documents'},
  {id:'delete', label: 'Delete'},
 
]

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
      marginLeft:'10px',
      width:'10%',
    },
    inputT:{
    marginLeft:'100px',
  
    marginTop:'10px'
   
    },
    buttonB:{
      marginLeft:'90px'
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
    },
    newButton:{
      position:'absolute', right:'50px'
  }
  })); 




export default function AdminDoc (){
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  }); 
  const [openPopup,setOpenPopup]=useState(false); 
  const [file, setfile] = useState();
  const [users,setUsers]=useState([]);
  const [filterFn,setFilterFn]=useState({fn: items=>{return items;}});
  const[confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
  const[userList,setUserList]=useState([]);
  const [updat,setup]= useState(0);
  const [open,setopen]= useState(false);
  const{
    
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaging
}=useTable(headCells,users,filterFn);

React.useEffect(() => {
  axios.get('http://localhost:5000/user/getalldoc')
  .then((response)=>{
      console.log(response)
      setUsers(response.data);
  }); 
}, [updat,open]);
 
  const newDoc = async (e) => {
    e.preventDefault();
    
        try {
          console.log();
          const data= new FormData();
        
          data.append('file',file)
          // data.append('comapny_id',36)
          axios.post("http://localhost:5000/user/uploaddoc", 
         data
        ).then((res) => {
          setup(data) 
          console.log("success");
          setNotify({
            isOpen:true,
            message:'Document Uploaded Succesfully',
            type:'success'
        });
        setOpenPopup(false);
        }).catch(err=>console.log(err));
        
        }
          catch (error) {
            console.log(error);
          }
        
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      newDoc(e);   
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete=company_id=>{
    console.log(company_id);
    setopen(true);
    setConfirmDialog({  
        ...confirmDialog,
        isOpen:false
    })
    axios.delete(`http://localhost:5000/user/getalldoc/${company_id}`).then((response)=>{
    setUserList(userList.filter((val)=>{
       return val.company_id!==company_id;
    }))
 });
 setNotify({
    isOpen:true,
    message:'Deleted Successfully',
    type:'error'
});

}
        return(     
      <>
     
       <ThemeProvider theme={theme} >
       <Admin_SideMenu/>
     
       <TestHeader />
       <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
        <PageHeader
                title="Company profile"
                subTitle="Update company profile and documents"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
        
            <Paper className={classes.profile}>
        <h2 className={classes.htag}>TexChain</h2>
        <hr/>
        <p className={classes.ptag}><LocationOnIcon/>&emsp; Karachi &emsp; &emsp; &emsp; 
        <PhoneIcon/>&emsp;0335-3845821 &emsp; &emsp; &emsp;
        <EmailIcon/>&emsp;texchain@gmail.com</p>
        
      </Paper>
      <Toolbar>
            
            <Controls.MainButton
          
               text="Add New"
               className={classes.newButton}
               variant="outlined"
               startIcon={<AddIcon/>}
               onClick={()=>{setOpenPopup(true)}}
            />
        </Toolbar>
      <Paper className={classes.root}>
      <TblContainer>
                    <TblHead/>
                    <TableBody>
            
                    
                    {
                        recordsAfterPaging().map(item=>
                        (<TableRow key={item.company_id}>
                            
                                <TableCell>{item.documents}</TableCell>
                                {/* <TableCell>{item.password}</TableCell> */}
                                
                                {/* <TableCell>{item.date}</TableCell> */}
                                <TableCell>
                                   
                                    <Controls.ActionButton
                                    color="secondary"
                                    onClick={()=>{
                                        setConfirmDialog({
                                            isOpen:true,
                                            title:'Are you sure to delete this record?',
                                            subTitle:"You can't undo this operation",
                                            onConfirm:()=>{onDelete(item.company_id)}
                                        })
                                        }}>
                                        <DeleteOutlineOutlinedIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>))
}
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            
            
  </Paper></div>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
             confirmDialog={confirmDialog}
             setConfirmDialog={setConfirmDialog}
             />
       <CssBaseline />
       </ThemeProvider>
       <Popup
       title="Document Form"
       openPopup={openPopup}
       setOpenPopup={setOpenPopup}>
       <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container  >
        <Grid item xs={12} className={classes.inputT}>
         
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
          {/* <Controls.MainButton
            text="Reset"
            color="default"
            onClick={resetForm}
          /> */}
        </div>
      </Grid> 
      </Grid>
    </Form>
       </Popup>
      </>
        
         ) };
    
   