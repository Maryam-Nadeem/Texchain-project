import React, { useState} from "react";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { useSelector, useDispatch } from "react-redux";
import Qrcode from "qrcode";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import axios from "axios";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import supplychain_contract from "../../components/Forms/factory";
import SideMenu from '../../components/sideMenu/Manu_SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import CropFreeSharpIcon from '@material-ui/icons/CropFreeSharp';
import { scanLogger } from "../../redux/Logger/Logger.actions";
import {toggleSds} from "../../redux/sds/Sds.actions";
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { toggleLoading } from "../../redux/Logger/Logger.actions";

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
  },
  buttonPack:{
    width:'148px'
  },
  THead:{
    position:'center'
  }
}));

const headCells = [
  { id: "Supplier", label: "Supplier" },

  { id: "upc", label: "UPC" },
  { id: "merchandizer", label: "Merchandizer" },
  
  { id: "description", label: "Description" },
  { id: "order", label: "Order Date" },
  { id: "quantity", label: "Quantity" },
  { id: "status", label: "Status" },
  { id: "status", label: "State" },
  //{id:'date', label: 'Date'},
  { id: "actions", label: "Actions" },
];

export default function SSOform(props) {

  const values={
    disabledbuttons:[],
    inCard:false
  }
  const scannerLogger=useSelector((state)=>state.Logger)
  console.log(scannerLogger.SLogger)
  const disabledSds = useSelector((state) => state.Supdev);
  const dispatch = useDispatch()
  const classes = useStyles();
  const buttonclick = useSelector((state) => state.item);
  console.log(buttonclick);
  const loadingState = useSelector(state => state.Logger)

 

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const [openPopup, setOpenPopup] = useState(false);
  const [disabled, setdisabled] = useState([]);
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
  const [imageurl, setimageurl] = useState("");
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
    headCells,
    users,
    filterFn
  );

  React.useEffect(() => {
    axios.get("http://localhost:5000/user/getMSO").then((response) => {
      console.log(response);
      setUsers(response.data);
      console.log(setdisabled(new Array(response.data.length).fill(false)))
      
    });
  }, [buttonclick.req_idd]);



  

  const acceptDelivery = async ({ item,idx }) => {
    
    disabled[idx]=true
     setdisabled(oldstate=>{
       return{
         ...oldstate,
        disabled: disabled
       }
     })
    
     
    console.log(disabled)
    values.inCard=true
    
    
    console.log(item.quantity);
    const accounts = "0x6829b48374596ada2b7cba811697454ed950c71e";
    console.log(supplychain_contract.methods.purchaseItemByManufacturer);
    const receiept = await supplychain_contract.methods
      .purchaseItemByManufacturer(item.upc, item.quantity, item.merchandizer)
      .send({
        from: accounts,
      });

      console.log(receiept.transactionHash)
      dispatch(toggleLoading())
      dispatch(toggleSds(disabled))
     
  };
  const checkstatus = async ({ item }) => {
    
    // console.log(scannerLogger.SLogger)
    
    const SLogger = await supplychain_contract.methods
      .fetchItemBufferOne(item.upc)
      .call();
      
    console.log(SLogger);
    dispatch(scanLogger(SLogger))
    console.log(scannerLogger.SLogger)
  //   dispatch(scanLogger(SLogger))
  //  console.log(scannerLogger.SLogger)
    //buttonclick.set=SLogger

    const value = ` <div>
  Story behind your purchased Raw Material: ${item.upc} 
  <h3> Origin Supplier By : ${SLogger[4]} (${SLogger[3]} ) </h3>
  <br/>
  <h3>Purchased by Manufacturer : ${SLogger[2]} </h3>
  <br/>
  <h3>Longitutde : ${SLogger[6]} </h3>
  <br/>
  <h3>Latitude : ${SLogger[5]} </h3>
  <br/>
  <h3>Created At : ${SLogger[8]} </h3>
  <br/>
</div>`;

    console.log(value);
    const response = Qrcode.toDataURL(value);
    console.log(
      response.then((res) => {
        console.log(res);
        setimageurl(res);
      })
    );
  };

 

  return (
    // <LoggerContext value={SLogger}>
  
    <>
        
      <SideMenu />
      <TestHeader />
      {console.log(disabled)}
      {loadingState.loading?(<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>):(console.log(users))}
    {/* {console.log(scannerLogger.SLogger)} */}
        <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      <PageHeader
        title="Supplier Delivery Status"
        subTitle="status of the raw material ordered from supplier"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper className={classes.root}>
        {/* <Toolbar>
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

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.upc}</TableCell>
                <TableCell>{item.merchandizer}</TableCell>
                <TableCell>{item.descript}</TableCell>
                <TableCell>{item.SOCreatedAt}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.status}</TableCell>
              {console.log(disabled[idx])}
              {console.log(idx)}
                {/* <TableCell>{item.date}</TableCell> */}
                <TableCell >
                <Button
                    id="button1"
                    variant="outlined"
                    onClick={() => {
                      
                      acceptDelivery({ item,idx });
                      dispatch(toggleLoading());
                      values.inCard = true;
                      //dispatch(toggleCartHidden(item));
                    }}
                    disabled={disabledSds.sds[idx]}
                    
                  >
                   {!values.inCard?'Accept Order':'Completed'}
                  </Button>
              </TableCell>
               <TableCell>
                 <Controls.ActionButton
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      checkstatus({ item});
                      setOpenPopup(true);
                      setRecordForEdit(null);
                    }}
                  >
                   <CropFreeSharpIcon fontSize="medium"/>
                   </Controls.ActionButton>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      </div>
      <Popup title="QR Code" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        {" "}
        {imageurl ? (
          <a href={imageurl} download>
            <img src={imageurl} alt="imgcode"></img>
          </a>
        ) : null}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
    // </LoggerContext>
  );
}

// {console.log(users, buttonclick.req_idd == item.req_id)}
// {buttonclick.req_idd == item.req_id && buttonclick.flag ? (
//   <Controls.MainButton 
//     // id="button1"
//     text= {item.orderpending}
//     variant="outlined"
//     color="secondary"
//     onClick={() => {
//       acceptDelivery({ item });
//       dispatch(toggleCartHidden(item));
//     }}
//   >
//     {/* {item.orderpending} */}
//   </Controls.MainButton>
// ) : (
//   <Controls.MainButton 
//   className={classes.buttonPack}
//   disabled
//   variant="outlined"
//   color="secondary"
//   text="  Order Pending">
    
//   </Controls.MainButton>
// )}



// {buttonclick.req_idd == item.req_id  ? (
//   <Button
//   id="button1"
//   variant="outlined"
//   onClick={() => {
//     acceptDelivery({ item });
//     document.getElementById('button1').setAttribute("disabled","disabled")
//     dispatch(toggleCartHidden(item));
//   }}
// >
//   Accept Order
// </Button>
  
// ) : (
//   <Button id="button12" disabled>
//   Order completed
// </Button>
  
// )}