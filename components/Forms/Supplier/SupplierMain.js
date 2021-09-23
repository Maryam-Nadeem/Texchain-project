import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PageHeader from '../../PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/AccountBalance';
import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from '../../controls/Controls';
import {  Search } from "@material-ui/icons";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Notification';
import ConfirmDialog from '../../ConfirmDialog';
import SuppForm from './SupplierForm';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';


const headCells=[
    {id:'upc', label: 'Item UPC'},
    {id:'material', label: 'Raw material '},
    {id:'price', label: 'Price'},
    {id:'quantity', label: 'Quantity'},
    {id:'createdAt', label: 'Production Date'},
    {id:'actions', label:'Actions'}
]

const useStyles = makeStyles(theme => ({
    // root:{
    // [theme.breakpoints.down('md')]: {
    //       width:'100%'
    //     }
    // },
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


export default function Supplier() {
    // const userlogin = useSelector((state) => state.user);
    // console.log(userlogin.user_id)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [filterFn,setFilterFn]=useState({fn: items=>{return items;}});
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [search,setSeach]=useState('');
    let[item, setitem]= useState('');
    const [holder,setholder]=useState([]);
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
    const[userList,setUserList]=useState([]);
    const[confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
    const [users,setUsers]=useState([]);
    const [updat,setup]= useState(0)
    const [open,setopen]= useState(false)
    axios.defaults.withCredentials=true;
    const [privatekey,setPrivateKey]=useState("");
    const [user_id,setUser_id]=useState("");
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
        setSeach(target.value)
        setFilterFn({
            fn: items=>{
                if(target.value=="")
                   return items;
                else
                   return items.filter(x=>x.upc.toLowerCase().includes(target.value))
            }
        })   
    }
    
    // const userCheck=userlogin.user_id?userlogin.user_id:'';
    React.useEffect(() => {
        axios.get("http://localhost:5000/user/login").then((response)=>{
            console.log(response.data)
              if(response.data.loggedIn==true){
                console.log(response.data.user[0])
                setUser_id(response.data.user[0].user_id);
                setPrivateKey(response.data.user[0].privatekey);
                axios.get(`http://localhost:5000/user/getallitems/${response.data.user[0].user_id}`)
                    .then((response)=>{
                        console.log(response)
                        setUsers(response.data);
                    }); 
        //   dispatch(userLogin(response.data.user[0].user_id))
          console.log(response.data.user[0].user_id)
          console.log(user_id)
        }});
        //giving error in logging, then show data
        // console.log(userlogin.user_id)
        
      },[updat,open]);



    const addOrEdit=(user,tx,resetForm)=>{
        setOpenPopup(false);
        // if(user.id!=0)
        //    {updateUser();}
        console.log(user)
        setup(user)  
        setNotify({
            isOpen:true,
            message:`Submitted Successfully at transaction ID : ${tx}`,
            type:'success'
        });
        setRecordForEdit(null);
        resetForm;
    }

    const openInPopup=item=>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete=item_id=>{
        console.log(item_id);
        setopen(true)
        setConfirmDialog({  
            ...confirmDialog,
            isOpen:false
        })
        axios.delete(`http://localhost:5000/user/getallitems/${item_id}`).then((response)=>{
        setUserList(userList.filter((val)=>{
           return val.item_id!==item_id;
        }))
     });
     setNotify({
        isOpen:true,
        message:'Deleted Successfully',
        type:'error'
    });
   
    }

    return (
        
        
        <div >
             
        {loadingState.loading?(<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>):(console.log(users))}
            {console.log(privatekey)}
            <PageHeader
                title="New Product"
                subTitle="Adding products for Access"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />


            <Paper className={classes.root}>
         
             <Toolbar>
                 <Controls.Input
                // style={{width:'75%'}}
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
                // style={{position:'absolute', right:'0px'}}
                   text="Add New"
                   className={classes.newButton}
                   variant="outlined"
                   startIcon={<AddIcon/>}
                   onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
                />
            </Toolbar>

            <TblContainer >
                    <TblHead/>
                    <TableBody>
                    
                    {
                        recordsAfterPaging().map(item=>
                        (<TableRow key={item.item_id}>
                            
                                <TableCell>{item.upc}</TableCell>
                                <TableCell>{item.material}</TableCell>
                                <TableCell>{item.price} Rs</TableCell>
                                <TableCell>{item.quantity} PCs</TableCell>
                                <TableCell>{item.ItemCreatedAt}</TableCell>
                        
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
                                            onConfirm:()=>{onDelete(item.item_id)}
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
              title="Product Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
                {/* {console.log(user_id)} */}
              <SuppForm
              privatekey={privatekey}
              user_id={user_id}
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
//                             <TableCell>{item.employee_id}</TableCell>
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