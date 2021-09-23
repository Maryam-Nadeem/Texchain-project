import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import {useSelector, useDispatch} from 'react-redux';


//import { connect } from 'react-redux';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from "@material-ui/core";
import useTable from "../../../components/useTable";
import { useForm, Form } from "../../../components/useForm";
import Controls from "../../../components/controls/Controls";

import axios from "axios";

import { getReq } from "../../../redux/item/item.actions";

import { toggleDodo } from "../../../redux/dodo/Dodo.actions";

const headCells = [
  { id: "upc", label: "Client" },

  { id: "quantity", label: "Description" },
  { id: "quantitys", label: "Merchandizer" },
  { id: "location", label: "Product UPC" },
  //{id:'date', label: 'Date'},

  { id: "action", label: "Action" },
];

const useStyles = makeStyles(theme => ({
  select: {
    minWidth: 100,
    
  },

  
}));


export default function NegotiateRequest(props) {
  const buttonclick = useSelector(state => state.item)
  const classes = useStyles();
  const disabledDodo = useSelector(state => state.Do)

  const dispatch = useDispatch()
  const[disab,setdisabled]=useState([])
  console.log(props);
  const { addOrEdit, setOpenPopup, recordForEdit,idx,useridx,disable } = props;
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const initialFValues = {
    merchandizer: "",
    options:''
    
    
  };
  const value={
    disabledbuttons:[],
    inCard:false
  }
  const[set, isset]=useState('')
  const [search, setSeach] = useState("");
  const [users, setUsers] = useState([]);
  const [productupc, setproductupc] = useState([]);
  const [options, setoptions] = useState("");

  const [userList, setUserList] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("quantity" in fieldValues)
      temp.merchandizer = fieldValues.merchandizer ? "" : "This field is required.";

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

  const handleSearch = (e) => {
    e.preventDefault();
    let target = e.target;
    setSeach(target.value);
    // console.log(search)
    // users.map((i)=>{
    //     if(i.user_name==search){
    //         console.log (i.user_id)
    //     }})
    //         let  holder = users.filter(item=>item.user_name.toLowerCase().includes(search.toLowerCase()))
    //   setholder(holder)
    //   console.log(holder)

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

    setUsers([recordForEdit]);
    axios.get('http://localhost:5000/user/getallproducts')
        .then((response)=>{
            console.log(response)
            setproductupc(response.data)
            
        });
    console.log(recordForEdit);
  }, []);

  const acceptOrder = async (item) => {
    disable[idx]=true
    console.log(disable)
    setdisabled(oldstate=>{
      return{
        ...oldstate,
       disab: disable
      }
    })
    value.inCard=true
    axios
      .get("http://localhost:5000/user/acceptbrandorder", {
        params: {
          sample: item.sample,
          merchandizer: values.merchandizer,
          productupc: values.options,
          req_id : item.breq_id
          //pass user id of supplier currently logged in
        },
      })
      .then((response) => {
        isset(true)
        addOrEdit([values,item],disable,resetForm);
        // dispatch(toggleDispatch(disable))
        // detect();
        dispatch(toggleDodo(disable))
        dispatch(getReq(item.breq_id))
        //dispatch(toggleCartHidden(item.breq_id))
        
      });
    
    
    setOpenPopup(false);
  };
  // const detect=()=>{
  //   console.log(disab)
  //  dispatch(toggleDodo(disable))
  //  // console.log(disabledlogger.dispatch)
  // }

  return (
    <>
     {console.log(disabledDodo.dodo)}

      <Paper style={{ margin: "2px", padding: "2px" }}>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item) => (
              <TableRow key={item.user_id}>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <TextField
                    
                    name="merchandizer"
                   
                    label="Merchandizer"
                    value={values.merchandizer}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                
            <TableCell>
            <InputLabel>Product UPC</InputLabel>
            <MuiSelect
            className={classes.select}
                label='Product upc'
                name='options'
                value={values.options}
                onChange={handleInputChange}>
                <MenuItem value=""></MenuItem>
                {
                    productupc.map(
                        item => (<MenuItem key={item.id} value={item.productupc}>{item.productupc}</MenuItem>)
                    )
                }
            </MuiSelect></TableCell>
                <TableCell>
                  <Controls.ActionButton
                    label="Actions"
                    color="primary"
                    
                    onClick={() => acceptOrder(item)}
                  >
                    Create Delivery
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
    </>
  );
}
