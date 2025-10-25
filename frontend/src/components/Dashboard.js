import React from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import TextPaste from './TextPaste';
import TextList from './TextList';

const Dashboard = ({ token, onLogout }) => {
  return (
    <div className="space-y-6">
      {/* Logout button */}
      <div className="flex justify-end">
        <button
          onClick={onLogout}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full border border-white/30 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          🚪 Logout
        </button>
      </div>

      {/* File section */}
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <div className="flex items-center mb-6">
          <span className="text-4xl mr-3">📁</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Files</h2>
        </div>
        <FileUpload token={token} />
        <div className="mt-6">
          <FileList token={token} />
        </div>
      </div>

      {/* Text section */}
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <div className="flex items-center mb-6">
          <span className="text-4xl mr-3">📝</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Texts</h2>
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