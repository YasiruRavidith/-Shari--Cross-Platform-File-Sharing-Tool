import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Save, Loader2 } from 'lucide-react';

const TextPaste = ({ token }) => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(
        `${API_URL}/api/text`,
        { content },
        { headers: { 'x-auth-token': token } }
      );
      alert('Text saved successfully!');
      setContent('');
    } catch (err) {
      alert('Failed to save text!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '24px' }}>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
          placeholder="Type or paste your text here..."
          className="textarea"
        />
      </div>
      
      <button
        type="submit"
        disabled={!content.trim() || saving}
        className="btn btn-primary"
      >
        {saving ? (
          <>
            <Loader2 size={18} className="spinner" />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            Save Text
          </>
        )}
      </button>
    </form>
  );
};

export default TextPaste;
