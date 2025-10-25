import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const TextList = ({ token }) => {
  const [texts, setTexts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTexts = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      const res = await axios.get(`${API_URL}/api/text`, {
        headers: { 'x-auth-token': token },
      });
      setTexts(res.data);
    } catch (err) {
      console.error('Error fetching texts:', err);
    } finally {
      if (showRefreshIndicator) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchTexts();
    const interval = setInterval(() => fetchTexts(true), 5000);
    return () => clearInterval(interval);
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('✓ Copied to clipboard!');
  };

  const startEdit = (text) => {
    setEditingId(text.id);
    setEditContent(text.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/api/text/${id}`, 
        { content: editContent },
        { headers: { 'x-auth-token': token } }
      );
      alert('✓ Text updated successfully!');
      setEditingId(null);
      setEditContent('');
      fetchTexts();
    } catch (err) {
      console.error('Error updating text:', err);
      alert('✗ Error updating text!');
    }
  };

  const deleteText = async (id) => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      try {
        await axios.delete(`${API_URL}/api/text/${id}`, {
          headers: { 'x-auth-token': token },
        });
        alert('✓ Text deleted successfully!');
        fetchTexts();
      } catch (err) {
        console.error('Error deleting text:', err);
        alert('✗ Error deleting text!');
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
          📝 Saved Texts
          {isRefreshing && <span className="ml-3 text-sm text-green-300 animate-pulse">🔄 Syncing...</span>}
        </h3>
        <button onClick={() => fetchTexts(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-6 rounded-full border border-white/30 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm">
          🔄 Refresh
        </button>
      </div>
      {texts.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-lg">No texts saved yet</p>
          <p className="text-sm mt-2">Save your first text snippet above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {texts.map((text) => (
            <div key={text.id} className="backdrop-blur-sm bg-white/10 rounded-3xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              {editingId === text.id ? (
                <div className="space-y-4">
                  <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full px-6 py-4 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none font-mono text-sm sm:text-base min-h-[120px]" />
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => saveEdit(text.id)} className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm">💾 Save</button>
                    <button onClick={cancelEdit} className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-full border border-white/30 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm">❌ Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <pre className="whitespace-pre-wrap break-words bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-white/90 font-mono text-sm sm:text-base border border-white/10">{text.content}</pre>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => copyToClipboard(text.content)} className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm">📋 Copy</button>
                    <button onClick={() => startEdit(text)} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm">✏️ Edit</button>
                    <button onClick={() => deleteText(text.id)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm">🗑️ Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextList;
