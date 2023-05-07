import React, { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './App.css';


let line=false;

let tickIt;
const Tick=()=>{

    const [lineData,setLineData]=useState(false);

        const tickIt=()=>{
               return setLineData(()=>{return true});
                 
        }

   return <span  className='checkcircle' onClick={tickIt} ><CheckCircleOutlineIcon /></span>
}

export default Tick;
export {tickIt};
