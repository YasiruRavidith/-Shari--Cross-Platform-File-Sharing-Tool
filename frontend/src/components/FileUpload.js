import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

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
      alert('✅ File uploaded successfully!');
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert('❌ File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="file"
          onChange={onChange}
          required
          className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 text-white file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white hover:file:opacity-90 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
        />
      </div>
      
      <button
        type="submit"
        disabled={!file || uploading}
        className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {uploading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Uploading...
          </span>
        ) : (
          '📤 Upload File'
        )}
      </button>
    </form>
  );
};

export default FileUpload;