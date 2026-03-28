const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing connection to Supabase...');
  console.log('URL:', supabaseUrl);
  
  try {
    const { data, error } = await supabase.from('_test_').select('*').limit(1);
    // Even if it fails, error will tell us if we reached Supabase
    if (error) {
       console.log('API responded with code:', error.code);
       console.log('API responded with message:', error.message);
    } else {
      console.log('Success! Data returned:', data);
    }
  } catch (err) {
    console.error('Network or Parse error:', err.message);
  }
}

testConnection();
