
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const iframe = document.getElementById('auth-frame');

const button = document.createElement('button');
button.textContent = 'Sign in with Google';


button.addEventListener('click', async () => {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      skipBrowserRedirect: true,
      redirectTo: 'https://getalai.com',
    },
  });

  if (error || !data || !data.url) {
    console.error('Error signing in:', error);
    return;
  }

  // open google oauth consent screen in new tab
  window.open(data.url, '_blank');
});

iframe.contentWindow.document.body.appendChild(button);

supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('authChanged', event, session);
  // BUG: NO EVENTS ARE FIRED
});