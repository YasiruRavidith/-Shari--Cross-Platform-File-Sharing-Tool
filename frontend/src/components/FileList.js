import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Trash2, File, FolderOpen, Download } from 'lucide-react';

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
    const interval = setInterval(() => fetchFiles(true), 5000);
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
        fetchFiles();
      } catch (err) {
        console.error('Error deleting file:', err);
        alert('Error deleting file');
      }
    }
  };

  const downloadFile = async (filepath, filename) => {
    try {
      // Fetch the file as a blob
      const response = await fetch(filepath);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Error downloading file:', err);
      // Fallback: open in new tab
      window.open(filepath, '_blank');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          Uploaded Files
          {isRefreshing && <span className="badge pulse">Syncing...</span>}
        </h3>
      </div>
      
      {files.length === 0 ? (
        <div className="empty-state">
          <FolderOpen size={64} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>No files uploaded yet</p>
          <p style={{ fontSize: '14px', margin: 0 }}>Upload your first file to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {files.map((file) => (
            <div key={file.id} className="item-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexDirection: 'row' }}>
                <div style={{ flex: '1', wordBreak: 'break-all', color: '#374151', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <File size={18} color="#667eea" />
                  {file.filename}
                </div>
                <div className="file-actions">
                  <button
                    onClick={() => downloadFile(file.filepath, file.filename)}
                    className="btn btn-primary"
                    style={{ fontSize: '13px', padding: '8px 16px' }}
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="btn btn-danger"
                    style={{ fontSize: '13px', padding: '8px 16px' }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
