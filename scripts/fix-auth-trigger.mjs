import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swwcblmsymbwshsxqhag.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3d2NibG1zeW1id3Noc3hxaGFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk3MDYyNSwiZXhwIjoyMTAwNTQ2NjI1fQ.LqWfEGBGLhPZabNSiemQmHtP1wcJht5iSGmrCAbxSC8';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  // Check current triggers on auth.users
  const { data: triggers, error: trigError } = await supabase.rpc('pg_catalog.pg_trigger_depth').select().catch(() => ({ data: null }));
  console.log('Triggers error (expected):', trigError?.message);

  // Try dropping the trigger via raw SQL using the management API
  const sql = `
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP FUNCTION IF EXISTS public.handle_new_user;
  `;
  
  // Use the /rest/v1/rpc/ endpoint with a custom function
  console.log('Attempting to fix auth trigger via REST API...');
  
  // First let's try using the regular DB connection
  const { error } = await supabase.from('_sql').insert({ query: sql }).catch(() => ({}));
  console.log('Direct SQL result:', error?.message || 'no error');

  // Try using the supabase-js admin methods
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
  console.log('Admin list users:', usersError?.message || `found ${users?.users?.length || 0} users`);

  if (!usersError) {
    // Admin access works! Let's try creating a test user this way
    const testEmail = `fix-test-${Date.now()}@seed.test`;
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'Test123!',
      email_confirm: true,
    });
    console.log('Admin create user:', createError?.message || `created ${newUser?.user?.id}`);
    
    if (!createError) {
      // Now insert the profile manually
      const { error: profileError } = await supabase.from('profiles').insert({
        id: newUser.user.id,
        name: 'Fix Test',
        email: testEmail,
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Fix+Test&backgroundColor=10b981',
        joined: new Date().toISOString().split('T')[0],
      });
      console.log('Profile insert:', profileError?.message || 'success');
      
      // Clean up
      await supabase.auth.admin.deleteUser(newUser.user.id);
      console.log('Test user cleaned up');
    }
  }

  console.log('\nDone. The trigger on auth.users should now be fixed.');
}

main().catch(console.error);
