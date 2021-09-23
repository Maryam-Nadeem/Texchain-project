import React, { useState, map } from "react";
import PageHeader from "../../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Provider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import supplychain from "../../contracts/Supplychain.json";
import Qrcode from "qrcode";
import CropFreeSharpIcon from '@material-ui/icons/CropFreeSharp';
import UsePersistedState from "../../../pages/Manufacturer/UsePersistedState";
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';


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
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../Popup";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../Notification";
import ConfirmDialog from "../../ConfirmDialog";
import { toggleCartHidden } from "../../../redux/item/item.actions";
import { scanLogger,toggleLoading} from "../../../redux/Logger/Logger.actions";
import {toggleBaorder} from "../../../redux/Baorder/baorder.actions";
import logger from "redux-logger";
const headCells = [
  { id: "upc", label: "UPC" },
  { id: "merchandizer", label: "Merchandizer" },
  { id: "sample", label: "Sample" },
  { id: "order", label: "Order Date" },
  { id: "state", label: "State" },
  { id: "actions", label: "Actions" },
];

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
    width:'170px'
  },
  THead:{
    position:'center'
  }
}));


export default function BrandSALESORDER(props) {
  const scannerLogger=useSelector((state)=>state.Logger)
  const values={
    disabledbuttons:[],
    inCard:false
  }
console.log(scannerLogger.SLogger)
  const classes = useStyles();
  const buttonclick = useSelector((state) => state.item);
  console.log(buttonclick);
  const disabledBaorder = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  const[disabled,setdisabled]=useState([])

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [search, setSeach] = useState("");
  const loadingState = useSelector(state => state.Logger)

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
  const [imageurl, setimageurl] = useState("");

  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
    headCells,
    users,
    filterFn
  );
const infuraKey =
  "wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931";

const privateKey =
  "9176b3b77e8cec54e5406f93ffe839cd9115a7efe36d2a0a53fc71f8721352db";
const BRAND_provider = new Provider(privateKey, infuraKey);
const web3s = new Web3(BRAND_provider);
const BRAND_contract = new web3s.eth.Contract(
  supplychain.abi,
  "0xCf77731Cb0C5459a5237BEAF5Df65526BE2Ff12a"
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
    axios.get("http://localhost:5000/user/getsalesorder").then((response) => {
      console.log(response);
      setUsers(response.data);
      console.log(setdisabled(new Array(response.data.length).fill(false)))
    });
  }, [buttonclick.req_idd]);

  


  const acceptDelivery = async ({ item ,idx}) => {
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
    const accounts = "0x17ca0f60ee0d9126f410dba466a659b3fb751496";
   const receipt = await BRAND_contract.methods
      .purchaseItemByBrand(item.productupc)
      .send({
        from: accounts,
      });

    console.log(receipt.transactionHash);
    dispatch(toggleLoading())
    dispatch(toggleBaorder(disabled))
  };

  const onDelete = (user_id) => {
    console.log(user_id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .delete(`http://localhost:5000/users/deleteitem/${user_id}`)
      .then((response) => {
        setUsers(
          users.filter((val) => {
            return val.user_id !== user_id;
          })
        );
      });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  const checkstatus = async ({ item }) => {
    const SLogger = await BRAND_contract.methods
      .fetchItemBufferThree(item.productupc)
      .call();
    console.log(SLogger);
    dispatch(scanLogger(SLogger))
    console.log(scannerLogger.SLogger)
    const value =`<div>
  Story behind your Product: ${item.productupc} 
  <h3>Manaufactured By : ${SLogger[2]} </h3>
  <br/>
  <h3>Client Address : ${SLogger[3]} </h3>
  <br/>
  <h3>Merchandizer Involved : ${SLogger[4]} </h3>
  <br/>
  <h3>Machines used in manufacturing your Product Involved : ${SLogger[8]} </h3>
  <br/>
  <h3>Passed through treatements : ${SLogger[5]} </h3>
  <br/>
  <h3>Emplyess  Involved : ${SLogger[7]} </h3>
  <br/>
 
</div>`;

// `<div>
//   Story behind your Product: ${item.productupc} 
//   <h3>Manaufactured By : ${logger[2]} </h3>
//   <br/>
//   <h3>Client Address : ${logger[3]} </h3>
//   <br/>
//   <h3>Merchandizer Involved : ${logger[4]} </h3>
//   <br/>
//   <h3>Machines used in manufacturing your Product Involved : ${logger[8]} </h3>
//   <br/>
//   <h3>Passed through treatements : ${logger[5]} </h3>
//   <br/>
//   <h3>Emplyess  Involved : ${logger[7]} </h3>
//   <br/>
 
// </div>`

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
    <>
    {console.log(scannerLogger.SLogger)}
    {loadingState.loading?(<Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>):(console.log(users))}
      <PageHeader
        title="Order Status"
        subTitle="Status of orders from Manufacturer"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper className={classes.root}>
        
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.productupc}</TableCell>
                <TableCell>{item.merch_id}</TableCell>
                <TableCell>{item.sample}</TableCell>
                <TableCell>{item.SOCreatedAt}</TableCell>

                <TableCell>
                <Button
                    id="button1"
                    variant="outlined"
                    onClick={() => {
                      acceptDelivery({ item,idx });
                      dispatch(toggleLoading());
                      values.inCard = true;
                      //dispatch(toggleCartHidden(item));
                    }}
                    disabled={disabledBaorder.baorder[idx]}
                    
                  >
                   {!values.inCard?'Accept Order':'Completed'}
                  </Button>
                  
               
               </TableCell>
               <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    variant="outlined"
                    //    className={classes.newButton}
                    onClick={() => {
                      checkstatus({ item });
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
      <Popup
        title="QR Code"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
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
  );
}
