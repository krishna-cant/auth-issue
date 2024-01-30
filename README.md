# Supabase Auth Issue Reproduction

This project demonstrates an issue with Supabase's `signInWithOAuth` method and `onAuthStateChange` event.

## Installation


1. Clone the repository to your local machine.

2. Navigate to the project directory in your terminal.

3. Install the project dependencies with npm:

```
npm install
```

## Running the Project

To start the project, use the start script defined in package.json:

```
npm start
```

This will start the Parcel bundler and serve your application at `http://localhost:1234` in your web browser.

## Reproducing the Issue

The issue can be reproduced by following these steps:

1. Open the application in your web browser at http://localhost:1234.

2. Click the 'Sign in with Google' button. This will open a new tab for the Google OAuth consent screen.

3. Sign in with your Google account.

4. Check the console of the original tab. You should see a log for the INITIAL_SESSION event, but no logs for any other auth state changes when the user signs in or out.

The expected behavior is that the onAuthStateChange event should be triggered when the user signs in or out, and these events should be logged to the console. However, only the INITIAL_SESSION event is being logged.

The relevant code for this issue can be found in the auth-issue.js file:
```
// Attach a click event listener to the button
button.addEventListener('click', async () => {
  ...
});

// Log onAuthStateChange events
supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('authChanged', event, session);
});
```
In this code, the signInWithOAuth method is called when the button is clicked, and the onAuthStateChange event is supposed to log auth state changes to the console. However, only the INITIAL_SESSION event is being logged.