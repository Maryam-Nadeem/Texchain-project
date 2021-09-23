import React, { useState } from "react";
import PageHeader from "../../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell 
} from "@material-ui/core";
import useTable from "../../useTable";

import axios from "axios";


const headCells = [
  { id: "UPC", label: "UPC" },
  { id: "Merchandizer", label: "Merchandizer" },
  { id: "Description", label: "Description" },
  { id: "OrderDate", label: "Order Date" },
  { id: "Status", label: "Status" },
  { id: "role_id", label: "Sample" }
  //{id:'date', label: 'Date'},
  // { id: "actions", label: "Actions" },
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

export default function MSOform() {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({
      fn: (items) => {
        return items;
      },
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [search, setSeach] = useState("");
  
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
  
    // const handleSearch = (e) => {
    //   e.preventDefault();
    //   let target = e.target;
    //   setSeach(target.value);
    //   // console.log(search)
    //   // users.map((i)=>{
    //   //     if(i.user_name==search){
    //   //         console.log (i.user_id)
    //   //     }})
    //   //         let  holder = users.filter(item=>item.user_name.toLowerCase().includes(search.toLowerCase()))
    //   //   setholder(holder)
    //   //   console.log(holder)
  
    //   setFilterFn({
    //     fn: (items) => {
    //       if (target.value == "") return items;
    //       else
    //         return items.filter((x) =>
    //           x.user_name.toLowerCase().includes(target.value)
    //         );
    //     },
    //   });
    // };
   
  
    React.useEffect(() => {
      axios.get("http://localhost:5000/user/getMSOSALESORDER").then((response) => {
        console.log(response);
        setUsers(response.data);
      });
    }, []);
  
    const addOrEdit = (user, resetForm) => {
      setOpenPopup(false);
      // if(user.id!=0)
      //    {updateUser();}
      setNotify({
        isOpen: true,
        message: `Submitted Successfully at transaction ID : ${user}`,
        type: "success",
      });
      setRecordForEdit(null);
      resetForm;
    };
  
    const openInPopup = (item) => {
      setRecordForEdit(item);
      setOpenPopup(true);
    };
  
    // const onDelete = (user_id) => {
    //   console.log(user_id);
    //   setConfirmDialog({
    //     ...confirmDialog,
    //     isOpen: false,
    //   });
    //   axios.delete(`http://localhost:5000/user/getMSOSALESORDER/${user_id}`).then((response) => {
    //     setUsers(
    //       users.filter((val) => {
    //         return val.user_id !== user_id;
    //       })
    //     );
    //   });
    //   setNotify({
    //     isOpen: true,
    //     message: "Deleted Successfully",
    //     type: "error",
    //   });
    // };
  
    return (
      <>
        <PageHeader
          title="Sales Order"
          subTitle="Sales Orders of Brands"
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
                <TableRow key={item.breq_id}>
                  <TableCell>{item.productupc}</TableCell>
                  <TableCell>{item.merchandizer}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.RequestCreatedAt}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.sample}</TableCell>
                  {/* <TableCell>{item.date}</TableCell> */}
                  {/* <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.user_id);
                          },
                        });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
        {/* <Popup
          title="User Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        /> */}
      </>
    );
  }
  
  