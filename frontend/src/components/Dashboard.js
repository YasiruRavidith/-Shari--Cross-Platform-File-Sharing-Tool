import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import TextPaste from './TextPaste';
import TextList from './TextList';
import { LogOut, FolderOpen, FileText, Menu, X } from 'lucide-react';

const Dashboard = ({ token, onLogout }) => {
  const [activeSection, setActiveSection] = useState('files');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mobile-menu-btn"
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1001,
          display: 'none',
          background: '#667eea',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px', marginRight: '280px', transition: 'margin-right 0.3s ease' }}>
        <div style={{ maxWidth: '1580px' }}>
          {/* File Section */}
          {activeSection === 'files' && (
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
          )}

          {/* Text Section */}
          {activeSection === 'texts' && (
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
          )}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 4px 0', color: '#1f2937' }}>
            Shari
          </h1>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
            File Sharing Tool
          </p>
        </div>

        <nav style={{ padding: '16px' }}>
          <button
            onClick={() => {
              setActiveSection('files');
              setSidebarOpen(false);
            }}
            className={`sidebar-btn ${activeSection === 'files' ? 'sidebar-btn-active' : ''}`}
          >
            <FolderOpen size={20} />
            <span>File Upload</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('texts');
              setSidebarOpen(false);
            }}
            className={`sidebar-btn ${activeSection === 'texts' ? 'sidebar-btn-active' : ''}`}
          >
            <FileText size={20} />
            <span>Text Upload</span>
          </button>

          <div style={{ borderTop: '1px solid #e5e7eb', margin: '16px 0', paddingTop: '16px' }}>
            <button onClick={onLogout} className="sidebar-btn sidebar-btn-danger">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Dashboard;
