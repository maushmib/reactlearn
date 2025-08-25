import React,{useState} from 'react'
const Feedback = (e) => {
  const [name,setname]=useState('');
  const response=(e)=>{
    e.preventDefault();
    alert('Thank you '+name);
  } 
  return (
    <form onSubmit={response}>
        <h1>FEEDBACK FORM</h1>
        <input type="text" placeholder="ENTER NAME" value={name} onChange={(e)=>setname(e.target.value)} />
        <br></br>
        <input type="text" placeholder="ENTER FEEDBACK" required/>
        <br></br>
        <button type="submit">Submit</button>
    </form>
  );
}

export default Feedback