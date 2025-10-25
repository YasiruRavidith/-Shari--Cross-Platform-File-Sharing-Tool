import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const TextList = ({ token }) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const fetchTexts = async () => {
      const res = await axios.get(`${API_URL}/api/text`, {
        headers: { 'x-auth-token': token },
      });
      setTexts(res.data);
    };
    fetchTexts();
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h3>Saved Texts</h3>
      {texts.map((text) => (
        <div key={text.id}>
          <pre>{text.content}</pre>
          <button onClick={() => copyToClipboard(text.content)}>Copy</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TextList;