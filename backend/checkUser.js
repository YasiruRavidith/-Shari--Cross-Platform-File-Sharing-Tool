require('dotenv').config();
const pool = require('./db');
const bcrypt = require('bcryptjs');

async function checkUser() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   Checking Users Table...                ║');
  console.log('╚══════════════════════════════════════════╝\n');

  try {
    // Check if users table exists and has data
    const result = await pool.query('SELECT * FROM users');
    
    if (result.rows.length === 0) {
      console.log('❌ No users found in the database!\n');
      console.log('📝 You need to create a user. Run:');
      console.log('   node setupPassword.js\n');
    } else {
      console.log(`✅ Found ${result.rows.length} user(s) in database\n`);
      console.log('User Details:');
      console.log('─────────────────────────────────────────');
      result.rows.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Password Hash: ${user.password.substring(0, 20)}...`);
        console.log(`  Created: ${user.created_at}`);
      });
      console.log('\n✅ Login should work with your password!\n');
      
      // Test password comparison
      console.log('Testing password verification...');
      const testPassword = 'Yasiru_@_20031129';
      const isMatch = await bcrypt.compare(testPassword, result.rows[0].password);
      
      if (isMatch) {
        console.log('✅ Password verification test: SUCCESS\n');
      } else {
        console.log('❌ Password verification test: FAILED');
        console.log('   The password might be different from what you expect.\n');
      }
    }
  } catch (err) {
    console.log('❌ Error checking users table:\n');
    console.log(err.message);
    console.log('\nPossible causes:');
    console.log('1. Users table does not exist - Run schema.sql in Supabase');
    console.log('2. Database connection issue - Check DATABASE_URL');
    console.log('3. Permission issue - Check database user permissions\n');
  } finally {
    await pool.end();
  }
}

checkUser();
