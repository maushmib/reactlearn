import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";


function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    const logAction = (message) => console.log(message);
    return <WrappedComponent {...props} logAction={logAction} />;
  };
}

 
function NotesApp({ logAction }) {
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const noteInputRef = useRef();

  const handleAddOrEditNote = () => {
    const value = noteInputRef.current.value.trim();
    if (!value) return;

    if (editingIndex === null) {
     
      setNotes([...notes, value]);
      logAction(`Note Added: ${value}`);
    } else {
      
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = value;
      setNotes(updatedNotes);
      logAction(`Note Edited: ${value}`);
      setEditingIndex(null);
    }

    noteInputRef.current.value = "";
    noteInputRef.current.focus();
  };

  const handleEditClick = (index) => {
    noteInputRef.current.value = notes[index];
    noteInputRef.current.focus();
    setEditingIndex(index);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Notes Taking App</h2>
      <input ref={noteInputRef} type="text" placeholder="Enter note" />
      <button onClick={handleAddOrEditNote}>
        {editingIndex === null ? "Add Note" : "Update Note"}
      </button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}{" "}
            <button onClick={() => handleEditClick(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


const NotesAppWithLogger = withLogger(NotesApp);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NotesAppWithLogger />);
export default withLogger(NotesApp);