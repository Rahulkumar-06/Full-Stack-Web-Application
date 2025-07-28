import axios from "axios";
import { useState , useEffect } from "react";

const UseFetch=(url)=>{
const [data,setData]=useState([]);
const [error,setError]=useState('');
useEffect(()=>{
    axios.get(url,{withCredentials: true})
    .then((response)=>{setData(response.data);
    })
    .catch((err)=>setError(err.message))
},[url]);
return [data,error];
}
export default UseFetch;