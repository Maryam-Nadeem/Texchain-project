
// import React, { useState,  useEffect } from "react";


// function UsePersistedState(key,disabled){
//     // const [state,setState]=useState(localStorage.getItem(key)||disabled);
//     // useEffect(()=>{
//     //   localStorage.setItem(key,state);
//     // },[key,state]);
//     // return[state,setState];
//     return(
        
//         <div>
//       {(() => {
//         if (typeof window !== "undefined") {
// return(
//         console.log("hi"))
        
//         }
//         else{
//             return(
//             localStorage.setItem(key, disabled))
//         }
//       })()}
//     </div>
//     )
    
//   }

//   export default UsePersistedState();