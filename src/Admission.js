import { useState } from 'react';

export default function Admission() {
  const [ph, setph] = useState('');
  const [mail, setmail] = useState('');
  const [name, setname] = useState('');

  const handle = (e) => {
    e.preventDefault();
    if (name.includes('@')) {
      alert('INVALID NAME');
    }
    if (ph.length !== 10) {
      alert('INVALID PHONE NUMBER');
    }
    if (!mail.includes('@')) {
      alert('INVALID MAIL ID');
    }
  };

  const formStyle = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: 'pink',
    fontFamily: 'Arial',
  };

  const labelStyle = {
    display: 'block',
    marginTop: '10px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  return (
    
    <form onSubmit={handle} style={formStyle}>
      <h1>ADMISSION FORM</h1>
      <label style={labelStyle}>NAME:</label>
      <input type="text" value={name} onChange={(e) => setname(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>D.O.B:</label>
      <input type="date" style={inputStyle} />

      <label style={labelStyle}>Father Name:</label>
      <input type="text" style={inputStyle} />

      <label style={labelStyle}>Mother Name:</label>
      <input type="text" style={inputStyle} />

      <label style={labelStyle}>Address:</label>
      <input type="text" style={inputStyle} />

      <label style={labelStyle}>Gender:</label>
      <select style={inputStyle}>
        <option>Female</option>
        <option>Male</option>
      </select>

      <label style={labelStyle}>Ph no:</label>
      <input type="number" value={ph} onChange={(e) => setph(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Mail ID:</label>
      <input type="text" value={mail} onChange={(e) => setmail(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Course:</label>
      <div style={{ marginBottom: '15px' }}>
        <input type="radio" name="course" /> CSE <br />
        <input type="radio" name="course" /> ECE <br />
        <input type="radio" name="course" /> IT <br />
        <input type="radio" name="course" /> AIDS
      </div>

      <input type="submit" value="Submit" style={{ ...inputStyle, backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }} />
    </form>
  );
}
