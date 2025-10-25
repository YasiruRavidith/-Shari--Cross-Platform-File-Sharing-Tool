import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const TextList = ({ token }) => {
  const [texts, setTexts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const fetchTexts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/text`, {
        headers: { 'x-auth-token': token },
      });
      setTexts(res.data);
    } catch (err) {
      console.error('Error fetching texts:', err);
    }
  };

  useEffect(() => {
    fetchTexts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const startEdit = (text) => {
    setEditingId(text.id);
    setEditContent(text.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/api/text/${id}`, 
        { content: editContent },
        { headers: { 'x-auth-token': token } }
      );
      alert('Text updated successfully');
      setEditingId(null);
      setEditContent('');
      fetchTexts(); // Refresh the list
    } catch (err) {
      console.error('Error updating text:', err);
      alert('Error updating text');
    }
  };

  const deleteText = async (id) => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      try {
        await axios.delete(`${API_URL}/api/text/${id}`, {
          headers: { 'x-auth-token': token },
        });
        alert('Text deleted successfully');
        fetchTexts(); // Refresh the list
      } catch (err) {
        console.error('Error deleting text:', err);
        alert('Error deleting text');
      }
    }
  };

  return (
    <div>
      <h3>Saved Texts</h3>
      {texts.length === 0 ? (
        <p>No texts saved yet</p>
      ) : (
        texts.map((text) => (
          <div key={text.id} style={{ 
            marginBottom: '15px', 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
          }}>
            {editingId === text.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '10px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    border: '1px solid #ccc',
                    borderRadius: '3px'
                  }}
                />
                <div style={{ marginTop: '10px' }}>
                  <button
                    onClick={() => saveEdit(text.id)}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <pre style={{ 
                  margin: '0 0 10px 0', 
                  whiteSpace: 'pre-wrap', 
                  wordWrap: 'break-word',
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '3px'
                }}>
                  {text.content}
                </pre>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => copyToClipboard(text.content)}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Copy
                  </button>
                  <button 
                    onClick={() => startEdit(text)}
                    style={{
                      backgroundColor: '#ffc107',
                      color: 'black',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteText(text.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TextList;