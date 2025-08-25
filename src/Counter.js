import React,{useState} from 'react'
import './App.css'
const Counter = () => {
    const [count1,setcount1]=useState(0);
    const [count2,setcount2]=useState(0);
  return (
    <div>
       
        <h1>{count1}</h1>
        <button onClick={()=>setcount2(count2+1)}>button1</button>
        <h1>{count2}</h1>
        <button onClick={()=>setcount1(count1+1)}>button2</button>
    </div>
  )
}

export default Counter;
