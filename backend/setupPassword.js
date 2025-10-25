require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./db');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function setup() {
  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users LIMIT 1');
    
    if (existingUser.rows.length > 0) {
      console.log('\n⚠️  A user already exists in the database.');
      rl.question('Do you want to replace it? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
          await createPassword();
        } else {
          console.log('Setup cancelled.');
          rl.close();
          pool.end();
        }
      });
    } else {
      await createPassword();
    }
  } catch (err) {
    console.error('Error:', err.message);
    console.log('\n💡 Make sure:');
    console.log('1. You have created the .env file with DATABASE_URL');
    console.log('2. You have run the schema.sql in Supabase');
    console.log('3. Your DATABASE_URL is correct\n');
    rl.close();
    pool.end();
  }
}

async function createPassword() {
  rl.question('\n🔐 Enter your desired password: ', async (password) => {
    if (!password || password.length < 6) {
      console.log('❌ Password must be at least 6 characters long.');
      rl.close();
      pool.end();
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Check again if user exists
      const existingUser = await pool.query('SELECT * FROM users LIMIT 1');
      
      if (existingUser.rows.length > 0) {
        // Update existing user
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
          hashedPassword,
          existingUser.rows[0].id
        ]);
        console.log('✅ Password updated successfully!');
      } else {
        // Insert new user
        await pool.query('INSERT INTO users (password) VALUES ($1)', [hashedPassword]);
        console.log('✅ Password setup complete!');
      }
      
      console.log('\n📝 You can now use this password to login to your application.');
      console.log('🔒 Keep this password safe!\n');
      
    } catch (err) {
      console.error('❌ Error setting up password:', err.message);
    } finally {
      rl.close();
      pool.end();
    }
  });
}

console.log('\n╔══════════════════════════════════════════╗');
console.log('║     Password Setup for Shari App        ║');
console.log('╚══════════════════════════════════════════╝\n');

setup();