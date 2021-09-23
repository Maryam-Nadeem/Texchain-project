import React,{useState} from 'react';
import AdminForm from './AdminForm';
import PageHeader from '../../PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/AccountBalance';
import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from '../../controls/Controls';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Notification';
import ConfirmDialog from '../../ConfirmDialog';
import {useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

const headCells=[
    {id:'user_name', label: 'User Name'},
    // {id:'password', label: 'Password'},
    {id:'role_id', label: 'Role'},
    {id:'account_address', label: 'Account Address'},
    {id:'email', label: 'Email'},
    {id:'location', label: 'Location'},
    //{id:'date', label: 'Date'},
    {id:'actions', label:'Actions'}
]

const useStyles = makeStyles(theme => ({
   
    root: {
        '.MuiFormControl-root':{width:'80%'},
            margin: theme.spacing(3),
            padding: theme.spacing(3)
        },
    
    SerachInput:{
        width:'35%'
    },
    newButton:{
        position:'absolute', right:'20px'
    }
  }));


export default function AdminMain() {
    const classes=useStyles();
   const [filterFn,setFilterFn]=useState({fn: items=>{return items;}});
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [search,setSearch]=useState('');
    let[item, setitem]= useState('');
    const [holder,setholder]=useState([]);
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
    const[userList,setUserList]=useState([]);
    const[confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
    const [users,setUsers]=useState([]);
    const [updat,setup]= useState(0)
    const [open,setopen]= useState(false)
    const loadingState = useSelector(state => state.Logger)
   

    

    const{
    
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    }=useTable(headCells,users,filterFn);

    const handleSearch=e=>{
        e.preventDefault();
        let target=e.target;
        setSearch(target.value)
        setFilterFn({
            fn: items=>{
                if(target.value=="")
                   return items;
                else
                   return items.filter(x=>x.user_name.toLowerCase().includes(target.value))
            }
        })   
    }

    React.useEffect(() => {
        axios.get('http://localhost:5000/user/getall')
        .then((response)=>{
            console.log(response)
            setUsers(response.data);
        }); 
      }, [updat,open]);



    const addOrEdit=(user,resetForm)=>{
        setOpenPopup(false);
        // setLoading(true);
        // if(user.id!=0)
        //    {updateUser();} 
        console.log(user)
        setup(user)       
        setNotify({
            isOpen:true,
            message:`Submitted Successfully at transaction ID : ${user}`,
            type:'success'
        });
        // setLoading(false);
        setRecordForEdit(null);
        resetForm;
        
    }

    const openInPopup=item=>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete=user_id=>{
        console.log(user_id);
        setopen(true)
        setConfirmDialog({  
            ...confirmDialog,
            isOpen:false
        })
        axios.delete(`http://localhost:5000/user/getall/${user_id}`).then((response)=>{
        setUserList(userList.filter((val)=>{
           return val.user_id!==user_id;
        }))
     });
     setNotify({
        isOpen:true,
        message:'Deleted Successfully',
        type:'error'
    });
   
    }

    return (
        
        <>
        {loadingState.loading?(<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>):(console.log(users))}
        {console.log(loadingState)}
            <PageHeader
                title="New User"
                subTitle="Adding users for Access"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />


            <Paper className={classes.root}>
         
             <Toolbar>
             <Controls.Input
              
                  label="Search Users"
                  
                  className={classes.SerachInput}
                  InputProps={{
                      startAdornment: (<InputAdornment position="start">
                          <Search/>
                      </InputAdornment>) 
                   }}
                  onChange={handleSearch}
                />
                <Controls.MainButton
              
                   text="Add New"
                   className={classes.newButton}
                   variant="outlined"
                   startIcon={<AddIcon/>}
                   onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
                />
            </Toolbar>

            <TblContainer>
                    <TblHead/>
                    <TableBody>
            
                    
                    {
                        recordsAfterPaging().map(item=>
                        (<TableRow key={item.user_id}>
                            
                                <TableCell>{item.user_name}</TableCell>
                                {/* <TableCell>{item.password}</TableCell> */}
                                <TableCell>{item.role_id}</TableCell>
                                <TableCell>{item.account_address}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                {/* <TableCell>{item.date}</TableCell> */}
                                <TableCell>
                                    <Controls.ActionButton
                                    color="primary"
                                    onClick={()=>{openInPopup(item)}}>
                                        <EditOutlinedIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                    color="secondary"
                                    onClick={()=>{
                                        setConfirmDialog({
                                            isOpen:true,
                                            title:'Are you sure to delete this record?',
                                            subTitle:"You can't undo this operation",
                                            onConfirm:()=>{onDelete(item.user_id)}
                                        })
                                        }}>
                                        <CloseIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>))
}
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            
            
</Paper>
<Popup
              title="User Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <AdminForm
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
           
        </>
    )
}

// return (
//     <>
//         <PageHeader
//             title="New Employee"
//             subTitle="Form design with validation"
//             icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
//         />
//         <Paper style={{margin:'2px',padding:'2px'}}>
//         {/* <InventoryForm/> */}
         
//             <Toolbar>
//                 <Controls.Input
//                 style={{width:'50%'}}
//                   label="Search Users"
//                 //   className={classes.SerachInput}
//                   InputProps={{
//                       startAdornment: (<InputAdornment position="start">
//                           <Search/>
//                       </InputAdornment>) 
//                    }}
//                   onChange={handleSearch}
//                 />
//                 <Controls.Button
//                 style={{position:'absolute', right:'10px'}}
//                    text="Add New"
//                 //    className={classes.newButton}
//                    variant="outlined"
//                    startIcon={<AddIcon/>}
//                    onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
//                 />
//             </Toolbar>
//             <TblContainer>
//                 <TblHead/>
//                 <TableBody>
               
//                 {
                    
//                      recordsAfterPaging().map(item=>
//                     (<TableRow key={item.id}>
                        
//                             <TableCell>{item.name}</TableCell>
//                             <TableCell>{item.email}</TableCell>
//                             <TableCell>{item.phone}</TableCell>
//                             <TableCell>{item.city}</TableCell>
//                             <TableCell>{item.gender}</TableCell>
//                             <TableCell>{item.department}</TableCell>
//                             {/* <TableCell>{item.date}</TableCell> */}
//                             <TableCell>
//                                 <Controls.ActionButton
//                                 color="primary"
//                                 onClick={()=>{openInPopup(item)}}>
//                                     <EditOutlinedIcon fontSize="small"/>
//                                 </Controls.ActionButton>
//                                 <Controls.ActionButton
//                                 color="secondary"
//                                 onClick={()=>{
//                                     setConfirmDialog({
//                                         isOpen:true,
//                                         title:'Are you sure to delete this record?',
//                                         subTitle:"You can't undo this operation",
//                                         onConfirm:()=>{onDelete(item.id)}
//                                     })
//                                     }}>
//                                     <CloseIcon fontSize="small"/>
//                                 </Controls.ActionButton>
//                             </TableCell>
//                         </TableRow>))
// }
//                 </TableBody>
//             </TblContainer>
//             <TblPagination/>
//         </Paper>
//         <Popup
//           title="Employee Form"
//           openPopup={openPopup}
//           setOpenPopup={setOpenPopup}
//         >
//           <InventoryForm
//            addOrEdit={addOrEdit}
//            setOpenPopup={setOpenPopup}
//            recordForEdit={recordForEdit}
//         />
//         </Popup>
//         <Notification
//           notify={notify}
//           setNotify={setNotify}
//         />
//         <ConfirmDialog
//          confirmDialog={confirmDialog}
//          setConfirmDialog={setConfirmDialog}
//          />
       
//     </>
// )
// }