import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`, {
        headers: { 'x-auth-token': token },
      });
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const deleteFile = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`${API_URL}/api/files/${id}`, {
          headers: { 'x-auth-token': token },
        });
        alert('File deleted successfully');
        fetchFiles(); // Refresh the list
      } catch (err) {
        console.error('Error deleting file:', err);
        alert('Error deleting file');
      }
    }
  };

  return (
    <div>
      <h3>Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files uploaded yet</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {files.map((file) => (
            <li key={file.id} style={{ 
              marginBottom: '10px', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <a
                href={file.filepath}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#007bff', flex: 1 }}
              >
                {file.filename}
              </a>
              <button
                onClick={() => deleteFile(file.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 15px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;