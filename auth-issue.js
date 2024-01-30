// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const SUPABASE_URL = 'https://thlxsdgebzowmojlwvkp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobHhzZGdlYnpvd21vamx3dmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxNTE4MjIsImV4cCI6MjAxOTcyNzgyMn0.19x_W2aGUjr22P8ySEbvE0NkK7V9b28QWeG5VK1FcBw';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get the iframe
const iframe = document.getElementById('auth-frame');

// Create a button
const button = document.createElement('button');
button.textContent = 'Sign in with Google';

// Attach a click event listener to the button
// Attach a click event listener to the button
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

// Append the button to the iframe
iframe.contentWindow.document.body.appendChild(button);

// Log onAuthStateChange events
supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('authChanged', event, session);
  // BUG: NO EVENTS ARE FIRED
});