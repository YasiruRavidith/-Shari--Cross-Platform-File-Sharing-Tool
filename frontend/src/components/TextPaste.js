import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const TextPaste = ({ token }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/text`,
        { content },
        { headers: { 'x-auth-token': token } }
      );
      alert('Text Saved');
      setContent('');
    } catch (err) {
      alert('Failed to save text');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        cols="50"
      ></textarea>
      <br />
      <button type="submit">Save Text</button>
    </form>
  );
};

export default TextPaste;