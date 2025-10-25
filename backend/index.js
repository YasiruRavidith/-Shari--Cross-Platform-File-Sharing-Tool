require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const auth = require('./middleware/auth');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// CORS configuration
app.use(cors({
  origin: ['https://shari-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization']
}));
app.use(express.json());

// Configure multer for memory storage (since Vercel doesn't support disk storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Authentication route
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  
  console.log('Login attempt received');
  
  try {
    console.log('Querying users table...');
    const user = await pool.query('SELECT * FROM users LIMIT 1');
    
    console.log(`Users found: ${user.rows.length}`);
    
    if (user.rows.length === 0) {
      console.log('No user found in database');
      return res.status(400).json({ msg: 'No user configured' });
    }

    console.log('Comparing password...');
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid password' });
    }

    console.log('Password matched, creating token...');
    const payload = {
      user: {
        id: user.rows[0].id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          throw err;
        }
        console.log('Login successful');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// File upload route
app.post('/api/upload', [auth, upload.single('file')], async (req, res) => {
  try {
    console.log('File upload request received');
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    console.log('File received:', req.file.originalname, 'Size:', req.file.size);
    const fileName = `${Date.now()}-${req.file.originalname}`;
    
    console.log('Uploading to Supabase Storage...');
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('files')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ msg: 'Error uploading file', error: error.message });
    }

    console.log('File uploaded to storage successfully:', fileName);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('files')
      .getPublicUrl(fileName);

    console.log('Public URL:', publicUrl);
    console.log('Saving to database...');

    // Save file info to database
    const result = await pool.query(
      'INSERT INTO files (filename, filepath) VALUES ($1, $2) RETURNING *',
      [req.file.originalname, publicUrl]
    );

    console.log('File saved to database:', result.rows[0]);
    res.json({ msg: 'File uploaded successfully', file: result.rows[0] });
  } catch (err) {
    console.error('Upload error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

app.get('/api/files', auth, async (req, res) => {
  try {
    const files = await pool.query('SELECT * FROM files ORDER BY created_at DESC');
    res.json(files.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/files/:id', auth, async (req, res) => {
  try {
    const file = await pool.query('SELECT * FROM files WHERE id = $1', [
      req.params.id,
    ]);
    if (file.rows.length === 0) {
      return res.status(404).json({ msg: 'File not found' });
    }
    // Return the file URL instead of downloading from disk
    res.json({ 
      filename: file.rows[0].filename, 
      url: file.rows[0].filepath 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete file route
app.delete('/api/files/:id', auth, async (req, res) => {
  try {
    const file = await pool.query('SELECT * FROM files WHERE id = $1', [req.params.id]);
    
    if (file.rows.length === 0) {
      return res.status(404).json({ msg: 'File not found' });
    }

    // Extract filename from filepath
    const filepath = file.rows[0].filepath;
    const filename = filepath.split('/').pop(); // Get last part of URL

    // Delete from Supabase Storage
    const { error } = await supabase.storage
      .from('files')
      .remove([filename]);

    if (error) {
      console.error('Supabase delete error:', error);
    }

    // Delete from database
    await pool.query('DELETE FROM files WHERE id = $1', [req.params.id]);

    res.json({ msg: 'File deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Text paste routes
app.post('/api/text', auth, async (req, res) => {
  const { content } = req.body;
  try {
    await pool.query('INSERT INTO texts (content) VALUES ($1)', [content]);
    res.json({ msg: 'Text saved successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/text', auth, async (req, res) => {
  try {
    const texts = await pool.query('SELECT * FROM texts ORDER BY created_at DESC');
    res.json(texts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update text route
app.put('/api/text/:id', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const text = await pool.query('SELECT * FROM texts WHERE id = $1', [req.params.id]);
    
    if (text.rows.length === 0) {
      return res.status(404).json({ msg: 'Text not found' });
    }

    await pool.query('UPDATE texts SET content = $1 WHERE id = $2', [content, req.params.id]);
    res.json({ msg: 'Text updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Delete text route
app.delete('/api/text/:id', auth, async (req, res) => {
  try {
    const text = await pool.query('SELECT * FROM texts WHERE id = $1', [req.params.id]);
    
    if (text.rows.length === 0) {
      return res.status(404).json({ msg: 'Text not found' });
    }

    await pool.query('DELETE FROM texts WHERE id = $1', [req.params.id]);
    res.json({ msg: 'Text deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});