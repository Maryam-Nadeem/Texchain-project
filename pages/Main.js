import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Admin from './Admin';
import {useSelector, useDispatch} from 'react-redux';
import Manu_inventory from './Manufacturer/Manu_inventory';
import Supplier from './Supplier/SupplierInvenory';
import Ordertab from './Brand/Ordertab';
import { userLogin } from '../redux/user/user.actions';
export default function Main(){
  const userlogin = useSelector((state) => state.user);
  console.log(userlogin.user_id)
  const dispatch = useDispatch()
    axios.defaults.withCredentials=true;
    const [role,setRoleId]=useState("");
    
     useEffect(()=>{
        axios.get("http://localhost:5000/user/login").then((response)=>{
          console.log(response.data)
            if(response.data.loggedIn==true){
              console.log(response.data.user[0])
        setRoleId(response.data.user[0].role_id);
        dispatch(userLogin(response.data.user[0].user_id))
        console.log(response.data.user[0].user_id)
        console.log(userlogin.user_id)
        // console.log(response.data.user[0].account_address)
            }
        })
    },[])
    // React.useEffect(() => {
    //     Axios
    //       .get("http://localhost:5000/user/getsuppliersItems")
    //       .then((response) => {
    //         console.log(response);
    //         setUsers(response.data);
    //       });
    //   }, []);

    return(<div>
   
   {console.log({role})}
   {console.log(userlogin.user_id)}
    
   <div>
      {(() => {
        if (role=='1') {
          return (
            <Manu_inventory/>
          )
        } else if (role=='2') {
          return (
            
            <Supplier
            userLogin={userlogin.user_id}/>
          )
        } else if(role=='3'){
          return (
           <Ordertab/>
          )
        } else if (role=='4') {
          return (
            
            <Admin/>
          )
        }
      })()}
    </div>


   {/* {role == '1' ? (
        <Supp_inventory/>
      ) : (
        {role == '2' ? (
          <Manu_inventory/>
        ) : (
          <Admin/>
        )}
        
      )} */}

   
  
   
      </div>)
}