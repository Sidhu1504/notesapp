import React, { useState } from 'react';

export default function Notes({ darkMode }) {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateNote = () => {
    if (!note.trim()) return;

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = note;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, note]);
    }

    setNote('');
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setNote(notes[index]);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (editIndex === index) {
      setEditIndex(null);
      setNote('');
    }
  };

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '0 auto',
      padding: '2rem',
      background: darkMode
        ? 'linear-gradient(to right, #1f1f1f, #2c2c2c)'
        : 'linear-gradient(to right, #f8f8ff, #f0f8ff)',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
      color: darkMode ? '#f1f1f1' : '#2c3e50',
      transition: 'background 0.4s ease, color 0.4s ease',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2.2rem',
      marginBottom: '1.5rem',
    },
    inputSection: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      padding: '0.8rem 1rem',
      fontSize: '1rem',
      borderRadius: '12px',
      border: '1px solid #ccc',
      outline: 'none',
      backgroundColor: darkMode ? '#222' : '#fff',
      color: darkMode ? '#f9f9f9' : '#000',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      transition: '0.2s ease-in-out',
    },
    addButton: {
      padding: '0.8rem 1.2rem',
      fontSize: '1rem',
      backgroundColor: editIndex !== null ? '#2196f3' : '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: '0.3s ease',
    },
    noteList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    noteCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: darkMode ? '#333' : '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: '0.3s ease',
    },
    noteText: {
      fontSize: '1.1rem',
      color: darkMode ? '#e0e0e0' : '#333',
      flex: 1,
    },
    actionButtons: {
      display: 'flex',
      gap: '0.6rem',
      marginLeft: '1rem',
    },
    editButton: {
      background: '#2980b9',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      padding: '0.5rem 0.6rem',
      cursor: 'pointer',
    },
    deleteButton: {
      background: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      padding: '0.5rem 0.6rem',
      cursor: 'pointer',
    },
    emptyState: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: darkMode ? '#aaa' : '#888',
      marginTop: '2rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 My Notes</h2>

      <div style={styles.inputSection}>
        <input
          type="text"
          placeholder={editIndex !== null ? "Update your note..." : "Write something amazing..."}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={addOrUpdateNote}
          style={styles.addButton}
        >
          {editIndex !== null ? '🔁 Update' : '➕ Add Note'}
        </button>
      </div>

      <div style={styles.noteList}>
        {notes.length === 0 ? (
          <p style={styles.emptyState}>Start by writing your first note!</p>
        ) : (
          notes.map((n, index) => (
            <div key={index} style={styles.noteCard}>
              <p style={styles.noteText}>{n}</p>
              <div style={styles.actionButtons}>
                <button onClick={() => startEditing(index)} style={styles.editButton}>✏️</button>
                <button onClick={() => deleteNote(index)} style={styles.deleteButton}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
