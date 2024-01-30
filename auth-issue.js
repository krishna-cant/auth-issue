import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function App() {
  const buttonRef = useRef(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('check supabase events');
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      // only fired on inital app load with null session ALWAYS (even if logged in/refreshed)
      console.log("session inside: ", session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // only fired on inital app load with INITIAL_SESSION event and null session ALWAYS (even if logged in/refreshed)
      console.log("onAuthStateChange: ", event, session);
      setSession(session);
    });

    // never fires
    console.log('is session set?', session);


    return () => subscription.unsubscribe();
  }, [supabaseClient.auth]);

  useEffect(() => {
    const button = document.createElement("button");
    button.textContent = "Sign in with Google";
    buttonRef.current.appendChild(button);

    button.addEventListener("click", async () => {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: 'https://getalai.com',
        },
      });

      if (error || !data || !data.url) {
        console.error("Error signing in:", error);
        return;
      }

      console.log("data", data);

      // open google oauth consent screen in a new tab
      window.open(data.url, "_blank");
    });

    return () => {
      // Cleanup
      button.removeEventListener("click");
    };
  }, []);

  return (
    <div>
      <div ref={buttonRef}></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
