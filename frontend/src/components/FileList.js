import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await axios.get(`${API_URL}/api/files`, {
        headers: { 'x-auth-token': token },
      });
      setFiles(res.data);
    };
    fetchFiles();
  }, [token]);

  return (
    <div>
      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a
              href={file.filepath}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;