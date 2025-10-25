import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const FileUpload = ({ token }) => {
  const [file, setFile] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      alert('File Uploaded');
    } catch (err) {
      alert('File upload failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;