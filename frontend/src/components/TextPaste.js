import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

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
      alert('✅ Text saved successfully!');
      setContent('');
    } catch (err) {
      alert('❌ Failed to save text!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="6"
        required
        placeholder="Type or paste your text here..."
        className="w-full px-6 py-4 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm sm:text-base"
      />
      
      <button
        type="submit"
        disabled={!content.trim() || saving}
        className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {saving ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Saving...
          </span>
        ) : (
          '💾 Save Text'
        )}
      </button>
    </form>
  );
};

export default TextPaste;