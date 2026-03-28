import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing connection to Supabase...')
  console.log('URL:', supabaseUrl)
  
  try {
    const { data, error } = await supabase.from('_test_').select('*').limit(1)
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('Connection successful (Table _test_ not found, but API responded)')
      } else {
        console.error('Supabase error:', error.message)
      }
    } else {
      console.log('Connection successful! Data:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testConnection()
