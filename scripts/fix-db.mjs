import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swwcblmsymbwshsxqhag.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3d2NibG1zeW1id3Noc3hxaGFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk3MDYyNSwiZXhwIjoyMTAwNTQ2NjI1fQ.LqWfEGBGLhPZabNSiemQmHtP1wcJht5iSGmrCAbxSC8';

const supabase = createClient(supabaseUrl, serviceKey);

async function main() {
  // Try to list all available RPC functions
  const { data: funcs, error: funcsError } = await supabase
    .from('rpc_functions')
    .select('*')
    .limit(10)
    .catch(() => ({ data: null, error: { message: 'no rpc_functions table' } }));
  console.log('RPC functions:', funcsError?.message || JSON.stringify(funcs));

  // Try to create a migration or edge function
  // Try calling pg_catalog to list triggers
  const { data: version, error: verError } = await supabase.rpc('version').select().catch(() => ({}));
  console.log('Version:', verError?.message || version);

  // Let's try using the management API with the correct token format
  // The correct way is to use the API URL and a PAT
  console.log('\nTrying Management API with service key...');
  
  const sql = `
    SELECT tgname, tgrelid::regclass::text AS table_name
    FROM pg_trigger
    WHERE NOT tgisinternal
    AND tgrelid = 'auth.users'::regclass;
  `;

  // Try using the database REST API with PostgREST
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: 'GET',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }
  }).catch(e => ({ status: e.message }));
  console.log('RPC list:', typeof response === 'object' ? response.status : response);

  // Final attempt: use raw Supabase SQL endpoint via the GoTrue API
  // The GoTrue API might have a way to configure/disable triggers
  console.log('\nChecking GoTrue settings...');
  const settingsResp = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: { apikey: serviceKey }
  }).catch(e => ({ status: e.message }));
  console.log('Settings:', typeof settingsResp === 'object' ? await settingsResp.text().catch(e => e.message) : settingsResp);

  console.log('\nDone. Unable to drop trigger via API alone.');
  console.log('Fix approach: modify signup to handle the trigger failure gracefully');
}

main().catch(console.error);
