require('dotenv').config();
const { Pool } = require('pg');

console.log('\n╔══════════════════════════════════════════╗');
console.log('║   Testing Supabase Connection...        ║');
console.log('╚══════════════════════════════════════════╝\n');

// Check if .env exists
if (!process.env.DATABASE_URL) {
  console.log('❌ ERROR: DATABASE_URL not found in .env file!\n');
  console.log('📝 Please create a .env file in the backend folder with:');
  console.log('   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.iyaakahzlqphttpuwxog.supabase.co:5432/postgres\n');
  process.exit(1);
}

console.log('📋 Connection Details:');
console.log('─────────────────────────────────────────\n');

// Parse and display connection info (hide password)
const url = process.env.DATABASE_URL;
const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

if (match) {
  const [, user, password, host, port, database] = match;
  console.log(`User:     ${user}`);
  console.log(`Password: ${'*'.repeat(password.length)} (hidden)`);
  console.log(`Host:     ${host}`);
  console.log(`Port:     ${port}`);
  console.log(`Database: ${database}`);
} else {
  console.log('⚠️  Could not parse DATABASE_URL');
  console.log(`URL: ${url.substring(0, 30)}...`);
}

console.log('\n─────────────────────────────────────────\n');
console.log('🔄 Attempting connection...\n');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.query('SELECT NOW() as current_time, version() as pg_version', (err, res) => {
  if (err) {
    console.log('❌ CONNECTION FAILED!\n');
    console.log('Error Details:');
    console.log('─────────────────────────────────────────');
    console.log(`Message: ${err.message}`);
    console.log(`Code:    ${err.code || 'N/A'}\n`);
    
    console.log('💡 Common Solutions:\n');
    console.log('1. Check your DATABASE_URL has the correct password');
    console.log('2. Make sure you replaced [YOUR-PASSWORD] with your actual password');
    console.log('3. Verify your Supabase project is active (not paused)');
    console.log('4. Check for typos in the connection string');
    console.log('5. Try resetting your database password in Supabase Settings\n');
    
  } else {
    console.log('✅ CONNECTION SUCCESSFUL!\n');
    console.log('Database Information:');
    console.log('─────────────────────────────────────────');
    console.log(`Current Time: ${res.rows[0].current_time}`);
    console.log(`PostgreSQL:   ${res.rows[0].pg_version.split(' ')[0]}\n`);
    console.log('🎉 Your database connection is working perfectly!\n');
  }
  
  pool.end();
});
