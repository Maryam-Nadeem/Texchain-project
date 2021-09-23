import React, { useState, map } from "react";
import PageHeader from '../../PageHeader';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import {useSelector, useDispatch} from 'react-redux';
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Popup from "../../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../../components/Notification";
import ConfirmDialog from '../../../components/ConfirmDialog';
import useTable from "../../../components/useTable";
import Controls from "../../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GetAppIcon from '@material-ui/icons/GetApp';
import NegotiateRequest from "./NegotiateRequest";


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


export default function BrandOrder() {

 
  const buttonclick = useSelector((state) => state.item);
  const dispatch = useDispatch()
  const classes = useStyles();
  const [search,setSeach]=useState('');
  const disabledDodo = useSelector((state) => state.Do);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
 const [set, isset]=useState(false)
  const [req_id, setreq] =useState(0)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const value = {
    disabledbuttons: [],
    inCard: false,
  };
  const [idx, setIdx] = useState(0);
  const [disabled, setdisabled] = useState([]);
  const [dis, setdis] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [users, setUsers] = useState([]);
  const [item, setitem] = useState('');
  const [userList, setUserList] = useState([]);
 const [updat,setup]= useState(0)
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
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
            x.user_name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/user/getbrandreq")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        console.log(setdisabled(new Array(response.data.length).fill(false)))
      });
    
  },[]);

const updateuser=async(user,req_id)=>{
  console.log(req_id,user)
  axios
  .put("http://localhost:5000/user/updatebrandrequest",{
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
              merchandizer:user
            }
          : val;
      })

      
    );
  });
 
}


const openInPopup = (item) => {
  console.log(item)
  setRecordForEdit(item);
  setOpenPopup(true);
};




const addOrEdit = async ([values,item],disab, resetForm) => {
  
  setdis(disabledDodo.dodo);
  setOpenPopup(false);
  // if(user.id!=0)
  console.log(values.merchandizer,item.breq_id)
 isset(true)
setreq(req_id)
setup(item.productupc)
  updateuser(values.merchandizer,item.breq_id)
console.log(disabledDodo.dodo)

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
     <PageHeader
        title="Brand Requests"
        subTitle="Order Requests from Brands"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />  

      {/* <Paper > */}
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
          
        </Toolbar>
        {recordsAfterPaging().map((item,idx) => (
          <Card className={classes.root} variant="outlined">
            <CardContent key={item.user_id}>
              
              <Typography variant="h5" component="h2">
                {item.user_name}
              </Typography>
              <hr/>
              <Typography variant="body2" component="p">
              <b> Created at &emsp; </b> {item.RequestCreatedAt}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Status &emsp;</b> {item.status}
              </Typography>
              <Typography variant="body2" component="p">
              <b>Product UPC &emsp; </b>{item.productupc}
            </Typography>
            <Typography variant="body2" component="p">
             <b> Merchandizer &emsp; </b>{item.merchandizer}
            </Typography>
              
              <Typography className={classes.pos} color="textPrimary">
                <b>Description &emsp;</b>{item.description}
                <br />
              </Typography>
              <Typography variant="body2" component="p">
                <Button variant="outlined">
                  <i className="fas fa-download"/>
                 <GetAppIcon fontSize="small" />
                 <a href={`/../public/uploadsamplefile/${item.sample}`} download>
            Download file 
          </a>
                 
                </Button>
                </Typography>
            </CardContent>
            <CardContent className={classes.button}>
            <Button
                //  disabled={btnFlag}

                id="button"
                variant="outlined"
                onClick={(e) => {
                  console.log(idx)
                  setIdx(idx);
                  openInPopup(item);
                  value.inCard = true;
                  
                }}
                disabled={disabledDodo.dodo[idx]}
              >
                {!value.inCard ? "Negotiate" : "Completed"}
             {console.log(disabledDodo.dodo)}
              </Button>
             
             
            </CardContent>
      
           
          </Card>
        ))}

        <TblPagination />
      {/* </Paper> */}
      <Popup
      title="Negotiate Request"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <NegotiateRequest
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

