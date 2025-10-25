import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Upload, Loader2 } from 'lucide-react';

const FileUpload = ({ token }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      alert('File uploaded successfully!');
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert('File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '24px' }}>
      <div className="mb-4">
        <input
          type="file"
          onChange={onChange}
          required
          className="file-input"
        />
      </div>
      
      <button
        type="submit"
        disabled={!file || uploading}
        className="btn btn-success"
      >
        {uploading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />
            Upload File
          </>
        )}
      </button>
    </form>
  );
};

export default FileUpload;
