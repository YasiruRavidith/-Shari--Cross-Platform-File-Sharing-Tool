import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFiles = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      const res = await axios.get(`${API_URL}/api/files`, {
        headers: { 'x-auth-token': token },
      });
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    } finally {
      if (showRefreshIndicator) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
    
    // Auto-refresh every 5 seconds for live updates across devices
    const interval = setInterval(() => {
      fetchFiles(true);
    }, 5000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
          📦 Uploaded Files
          {isRefreshing && <span className="ml-3 text-sm text-green-300 animate-pulse">🔄 Syncing...</span>}
        </h3>
        <button
          onClick={() => fetchFiles(true)}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-6 rounded-full border border-white/30 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
        >
          🔄 Refresh
        </button>
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          <div className="text-6xl mb-4">📂</div>
          <p className="text-lg">No files uploaded yet</p>
          <p className="text-sm mt-2">Upload your first file to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div 
              key={file.id} 
              className="backdrop-blur-sm bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <a
                  href={file.filepath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-200 transition-colors duration-200 flex-1 break-all group-hover:underline font-medium"
                >
                  📄 {file.filename}
                </a>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;