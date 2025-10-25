import React from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import TextPaste from './TextPaste';
import TextList from './TextList';

const Dashboard = ({ token, onLogout }) => {
  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <hr />
      <FileUpload token={token} />
      <FileList token={token} />
      <hr />
      <TextPaste token={token} />
      <TextList token={token} />
    </div>
  );
};

export default Dashboard;