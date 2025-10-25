import React from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import TextPaste from './TextPaste';
import TextList from './TextList';
import { LogOut, FolderOpen, FileText } from 'lucide-react';

const Dashboard = ({ token, onLogout }) => {
  return (
    <div className="container">
      {/* Header */}
      <div className="header-card mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', margin: '0 0 4px 0' }}>
            Shari
          </h1>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
            Cross-Platform File Sharing
          </p>
        </div>
        <button onClick={onLogout} className="btn btn-secondary">
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* File section */}
      <div className="card">
        <div className="section-header">
          <FolderOpen size={28} color="#667eea" />
          <h2 className="section-title">Files</h2>
        </div>
        <FileUpload token={token} />
        <div className="mt-6">
          <FileList token={token} />
        </div>
      </div>

      {/* Text section */}
      <div className="card">
        <div className="section-header">
          <FileText size={28} color="#667eea" />
          <h2 className="section-title">Texts</h2>
        </div>
        <TextPaste token={token} />
        <div className="mt-6">
          <TextList token={token} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
