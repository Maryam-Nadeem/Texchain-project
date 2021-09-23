import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import {useSelector, useDispatch} from 'react-redux';
import {

  makeStyles,
  Toolbar,
  InputAdornment,

} from "@material-ui/core";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InventoryForm from "./InventoryForm";
import Supp_SideMenu from "../../components/sideMenu/Supp_SideMenu";
import TestHeader from "../../components/Headers/TestHeader";


const headCells = [
  { id: "upc", label: "Item UPC" },
  { id: "material", label: "Raw material " },
  { id: "price", label: "Price" },
  { id: "createdAt", label: "Production Date" },
  { id: "quantity", label: "Quantity" },
  { id: "actions", label: "Actions" },
];

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 75,
    padding: theme.spacing(2),
    margin: theme.spacing(3)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  toolbar:{
    padding:theme.spacing(1.5),
    marginTop:'15px'
  },
  SerachInput:{
    width:'30%'
  },
  button:{
   float:'right',
   marginTop:'-150px'
  },
  Popup:{
    margin:'50%'
  }
  
}));

export default function RequestsByManufacturer() {

  // const btnFlag=useContext(ToggleContext)
  axios.defaults.withCredentials=true;
  const userlogin = useSelector((state) => state.user);
  const disabledDispatch = useSelector(state => state.Dis)
  console.log(userlogin.user_id)
    const [suser_id,setUserId]=useState("");
    axios.defaults.withCredentials=true;
  const classes = useStyles();
  const ReqChange = useSelector(state => state.item)
  const buttonclick = useSelector((state) => state.item);
  const dispatch = useDispatch()
  const [search,setSeach]=useState('');
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const value={
    disabledbuttons:[],
    inCard:false
  }
  const [set, isset]=useState(false)
  const [req_id, setreq] =useState(0)
  const [idx, setIdx] = useState(0)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [users, setUsers] = useState([]);
  const[disabled,setdisabled]=useState([]);
  const[dis,setdis]=useState([])

  // const [item, setitem] = useState([]);
  const [userList, setUserList] = useState([]);
 const [updat,setup]= useState(0)
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [user_id,setUser_id]=useState("");
  // const [user_id,setUserId]=useState("");
  const { TblPagination, recordsAfterPaging } = useTable(
    headCells,
    users,
    filterFn
  );

  const handleSearch = (e) => {
    e.preventDefault();
    let target = e.target;
    setSeach(target.value);
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.upc.toLowerCase().includes(target.value)
          );
      },
    });
  };
  
  React.useEffect(() => {
    axios.get("http://localhost:5000/user/login").then((response)=>{
      console.log(response.data)
        if(response.data.loggedIn==true){
          console.log(response.data.user[0])
          setUser_id(response.data.user[0].user_id);
     axios
      .get(`http://localhost:5000/user/getmanufacturerrequests/${response.data.user[0].user_id}`)// get requests wherer user-id of supplier logged in matches the suser-id against the manu requests
      .then((response) => {  // use getmanufacturerrequests/${id} this api
        console.log(response);
        setUsers(response.data);
        setdisabled(new Array(response.data.length).fill(false))
      });
    }});
    
  },[]);

  const updateuser=async(user,req_id)=>{
    console.log(req_id,user)
    axios
    .put("http://localhost:5000/user/updatemanurequest",{
      quantity:user,
      req_id:req_id
    })
    .then((response) => {
      console.log(response);
      setUserList(
        userList.map((val) => {
          return val.req_id === req_id
            ? {
                req_id: val.req_id,
                quantity:user
              }
            : val;
        })
  
        
      );
    });
   
  }


const openInPopup = (item) => {
  setRecordForEdit(item);
  setOpenPopup(true);
};




const addOrEdit = async ([user,req_id],disab, resetForm) => {

console.log(disab)
  setdis(disabledDispatch.dispatch)
  console.log(disabledDispatch.dispatch)
  setOpenPopup(false);
  // if(user.id!=0)
  
 isset(true)
setreq(req_id)
setup(user.quantitys)
  updateuser(user.quantitys,req_id)


  setNotify({
    isOpen: true,
    message: `Delivery Alert`,
    type: "success",
  });
  setRecordForEdit(null);
  resetForm;
};
  return (
    <>

      
      <Supp_SideMenu/>
      <TestHeader/>
      {/* <Paper style={{ margin: "2px", padding: "2px" }}> */}
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      {console.log(disabled)}
      
      <PageHeader
        title="Requests"
        subTitle="Requests from Manufacturers"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />  
      
        <Toolbar className={classes.toolbar}>
          <Controls.Input
            
            label="Search Users"
              className={classes.SerachInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          {/* <Controls.MainButton
            style={{ position: "absolute", right: "10px" }}
            text="Add New"
            //    className={classes.newButton}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          /> */}
        </Toolbar>
{/* {console.log(btnFlag)} */}
        {recordsAfterPaging().map((item,idx) => (
          <Card className={classes.root} variant="outlined">
           
            <CardContent key={item.user_id}>
              <Typography variant="h5" component="h2">
                {item.user_name}
              </Typography>
              <hr/>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                <b>Merchandizer to contact &emsp; </b>{item.merchandizer}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Material &emsp;  </b>{item.material}
              </Typography>
              <Typography variant="body2" component="p">
               <b> UPC &emsp; </b> {item.upc}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Quantity Required &emsp; </b> {item.quantity}
              </Typography>
              <Typography variant="body2" component="p">
              <b>Status &emsp; </b> {item.status}
            </Typography>
              <Typography className={classes.pos} color="textPrimary">
               <b> Description &emsp; </b> {item.description}
                <br />
              </Typography> 
              </CardContent>
              <CardContent className={classes.button}>
              
           
              <Button
              //  disabled={btnFlag}
              
              id="button"
              variant="outlined"
              onClick={(e) => {
               
                setIdx(idx)
                openInPopup(item);
              
                value.inCard=true;
              
                // <UsePersistedState  key={idx} disabled={dis}/>
              }}
              disabled={disabledDispatch.dispatch[idx]}
            >
             {!value.inCard?'Check Inventory':'Completed'}
  
            </Button>
           
          </CardContent>
          </Card>
        ))}

        <TblPagination />
        </div>
      {/* </Paper> */}
      <Popup className={classes.Popup}
      title="Request Edit"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <InventoryForm
        addOrEdit={addOrEdit}
        setOpenPopup={setOpenPopup}
        recordForEdit={recordForEdit}
        idx={idx}
        useridx={users}
        disable={disabled}
      />
    </Popup>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
    
    </>
  );
}

