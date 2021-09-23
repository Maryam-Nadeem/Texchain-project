import React, { useState, map } from "react";
import PageHeader from "../../components/PageHeader";
import TextField from "@material-ui/core/TextField";
import {useSelector, useDispatch} from 'react-redux';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import { useForm, Form } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import { Flag, Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { toggleCartHidden, togglefLAG ,toggleSET} from "../../redux/item/item.actions";
import { ToggleContext } from "../../Contexts/ToggleContext";
import { toggleDispatch } from "../../redux/dispatch/Dispatch.actions";

const headCells = [
  { id: "upc", label: "UPC" },

  { id: "quantity", label: "Quantity" },
  { id: "quantitys", label: "Deliver Quantity" },
  { id: "location", label: "Location" },
  //{id:'date', label: 'Date'},
  { id: "description", label: "Requirement" },

  { id: "action", label: "Action" },
];

export default function InventoryForm(props) {
  const disabledDispatch = useSelector(state => state.Dis)
  const userlogin = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log(props);
  const { addOrEdit, setOpenPopup, recordForEdit,idx,useridx,disable} = props;
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const initialFValues = {
    quantitys: "",
  };
  const value={
    disabledbuttons:[],
    inCard:false
  }
  const[disab,setdisabled]=useState([])

  const[set, isset]=useState(false)
  const [search, setSeach] = useState("");
  const [users, setUsers] = useState([]);
  // const [btnFlag,setBtnFlag]=useState(false);
  const [userList, setUserList] = useState([]);
  
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("quantity" in fieldValues)
      temp.quantitys = fieldValues.quantitys ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
    headCells,
    users,
    filterFn
  );



  React.useEffect(() => {

    setUsers([recordForEdit]);
   

    
  }, []);

  const acceptOrder = async (item) => {
    console.log(item.upc);
    disable[idx]=true
    console.log(disable)
    setdisabled(oldstate=>{
      return{
        ...oldstate,
       disab: disable
      }
    })

  console.log(disab)
   value.inCard=true
    axios
      .get("http://localhost:5000/user/acceptorder", {
        params: {
          upc: item.upc,
          quantity: values.quantitys,
          material: item.material,
          description: item.description,
          merchandizer: item.merchandizer,
          suser_id: userlogin.user_id,
          muser_id: item.user_id,
          req_id : item.req_id
          //pass user id of supplier currently logged in
        },
      })
      .then((response) => {
        isset(true)
        console.log(disab)
        addOrEdit([values,item.req_id],disable,resetForm);
        dispatch(toggleDispatch(disable))
        dispatch(toggleCartHidden(item.req_id))
      
      });
    
    // const accounts = "0xebf665bf612b6d7c129d8926627d393e0a6a8199";
    // console.log(web3.eth.getBalance(accounts).then(console.log));
    // const receiept = await supplychain_contract.methods
    //   .purchaseItemByManufacturer(item.upc, item.quantity, item.merchandizer)
    //   .send({
    //     from: accounts,
    //   });

    // console.log(receiept.transactionHash);

    setOpenPopup(false);
  };
// const detect=()=>{
//   console.log(disab)
//  dispatch(toggleDispatch(disable))
//  // console.log(disabledlogger.dispatch)
// }
  return (
    <>
      <Paper style={{ margin: "2px", padding: "2px" }}>      
{console.log(disab)}
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item) => (
              <TableRow key={item.user_id}>
                <TableCell>{item.upc}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <TextField
                    id="standard-number"
                    name="quantitys"
                    type="number"
                    value={values.quantitys}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.description}</TableCell>
{console.log(idx)}
                {/* <TableCell>{item.date}</TableCell> */}
                <TableCell>
                  <Controls.ActionButton
                    label="Action"
                    color="primary"
                    onClick={() => {acceptOrder(item)
                     
                    }}
                  >
                    Create Delivery
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
  
        {/* <TblPagination /> */}
      </Paper>
   
    </>
  );
}
