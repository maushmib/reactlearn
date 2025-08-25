import React,{useState} from 'react'
function Check(){
    const [email,setEmail]=useState('');
    
    const validate=(e)=>{
     e.preventDefault();
     if(!email.includes('@')){
        alert("invalid");
     }
     else{
        alert("valid");
     }
    };   
    return (
     
        <form onSubmit={validate}>
        <h1>LEARN FORM</h1>
        <input type="text" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}  />
        <button type="sumbit">submit</button>
        </form>
    
  );
}

export default Check;