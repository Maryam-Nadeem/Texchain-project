import React, { useState, map } from "react";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { toggleCartHidden } from "../../redux/item/item.actions";
import supplychain_contract from "../../components/Forms/factory";
import Web3 from "web3";
import Manu_SideMenu from "../../components/sideMenu/Manu_SideMenu";
import TestHeader from "../../components/Headers/TestHeader";
import EditIcon from '@material-ui/icons/Edit';
import MerchForm from "../../components/Forms/MerchForm";

const headCells = [
  { id: "Supplier", label: "Batch" },

  { id: "upc", label: "UPC" },
  { id: "merchandizer", label: "Merchandizer" },

  { id: "item_left", label: "Item left" },
  { id: "order", label: "Order Date" },
  { id: "action", label: "Actions" },
  

  //{id:'date', label: 'Date'},
 
];

const useStyles = makeStyles(theme => ({
  toolbar:{
  padding:theme.spacing(5),
    marginTop:'15px'
  },
  table:{
   margin:theme.spacing(5),
  },
  root:{
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}));

export default function MerchStock(props) {
  const classes=useStyles();
  const buttonclick = useSelector((state) => state.item);
  console.log(buttonclick);
  const dispatch = useDispatch();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [search, setSeach] = useState("");
  const [updat,setup]= useState(0)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [userList, setUserList] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [users, setUsers] = useState([]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
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

  const openInPopup=item=>{
    setRecordForEdit(item);
    setOpenPopup(true);
}
  React.useEffect(() => {
    axios.get("http://localhost:5000/user/getmerchstock").then((response) => {
      console.log(response);
      setUsers(response.data);
    });
  }, [updat]);

  const addOrEdit = (user, resetForm) => {
    setOpenPopup(false);
    // if(user.id!=0)
    //    {updateUser();}
    console.log(user)
    setup(user)
    setNotify({
      isOpen: true,
      message: `Submitted Successfully at transaction ID : ${user}`,
      type: "success",
    });
    setRecordForEdit(null);
    resetForm;
  };



  // const onDelete = (user_id) => {
  //   console.log(user_id);
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false,
  //   });
  //   axios
  //     .delete(`http://localhost:5000/users/deleteitem/${user_id}`)
  //     .then((response) => {
  //       setUsers(
  //         users.filter((val) => {
  //           return val.user_id !== user_id;
  //         })
  //       );
  //     });
  //   setNotify({
  //     isOpen: true,
  //     message: "Deleted Successfully",
  //     type: "error",
  //   });
  // };

  return (
    <>
    <TestHeader/>
      <Manu_SideMenu/>

      {/* <Paper style={{ margin: "2px", padding: "2px" }}> */}
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      {/* <Supp_SideMenu/> */}
      <PageHeader
        title="Merchandizer Stock"
        subTitle="Raw Material stock of merchandizer"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper className={classes.root}>
        {/* <Toolbar className={classes.toolbar}>
          <Controls.Input
            style={{ width: "50%" }}
            label="Search Users"
            //   className={classes.SerachInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.MainButton
            style={{ position: "absolute", right: "10px" }}
            text="Add New"
            //    className={classes.newButton}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar> */}
        <TblContainer className={classes.table}>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item) => (
              <TableRow key={item.stock_id}>
                <TableCell>{item.batch_no}</TableCell>
                <TableCell>{item.upc}</TableCell>
                <TableCell>{item.merch_id}</TableCell>
                <TableCell>{item.item_left}</TableCell>
                <TableCell>{item.CreatedAt}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    variant="outlined"
                    //    className={classes.newButton}
                    onClick={() => {
                      // checkstatus({ item });
                      openInPopup(item)
                    }}
                  >
                    <EditIcon fontSize="medium"/>
                  </Controls.ActionButton>
                </TableCell>
                
               
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      
      </Paper> </div>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MerchForm
               addOrEdit={addOrEdit}
               setOpenPopup={setOpenPopup}
               recordForEdit={recordForEdit}
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
