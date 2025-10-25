import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { RefreshCw, Copy, Edit2, Trash2, Save, X, FileText } from 'lucide-react';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
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
      alert('Text updated successfully!');
      setEditingId(null);
      setEditContent('');
      fetchTexts();
    } catch (err) {
      console.error('Error updating text:', err);
      alert('Error updating text!');
    }
  };

  const deleteText = async (id) => {
    if (window.confirm('Are you sure you want to delete this text?')) {
      try {
        await axios.delete(`${API_URL}/api/text/${id}`, {
          headers: { 'x-auth-token': token },
        });
        alert('Text deleted successfully!');
        fetchTexts();
      } catch (err) {
        console.error('Error deleting text:', err);
        alert('Error deleting text!');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          Saved Texts
          {isRefreshing && <span className="badge pulse">Syncing...</span>}
        </h3>
      </div>
      
      {texts.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>No texts saved yet</p>
          <p style={{ fontSize: '14px', margin: 0 }}>Save your first text snippet above!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {texts.map((text) => (
            <div key={text.id} className="card" style={{ marginBottom: 0 }}>
              {editingId === text.id ? (
                <div>
                  <textarea 
                    value={editContent} 
                    onChange={(e) => setEditContent(e.target.value)} 
                    className="textarea mb-4"
                    style={{ minHeight: '120px' }}
                  />
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => saveEdit(text.id)} className="btn btn-success" style={{ fontSize: '13px', padding: '8px 16px' }}>
                      <Save size={16} />
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <pre className="code-block">{text.content}</pre>
                  <div className="flex gap-2 flex-wrap" style={{ marginTop: '12px' }}>
                    <button onClick={() => copyToClipboard(text.content)} className="btn btn-info" style={{ fontSize: '13px', padding: '8px 16px' }}>
                      <Copy size={16} />
                      Copy
                    </button>
                    <button onClick={() => startEdit(text)} className="btn btn-warning" style={{ fontSize: '13px', padding: '8px 16px' }}>
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button onClick={() => deleteText(text.id)} className="btn btn-danger" style={{ fontSize: '13px', padding: '8px 16px' }}>
                      <Trash2 size={16} />
                      Delete
                    </button>
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
