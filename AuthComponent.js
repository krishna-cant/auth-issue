import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useContext } from "react";

import UserContext from "./UserContext";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function AuthComponent() {
  // const signInButtonRef = useRef(null);
  // const signOutButtonRef = useRef(null);
  const iframeRef = useRef(null);
  const { session, setSession } = useContext(UserContext);

  useEffect(() => {
    console.log("is session set?", session);
    // rest of the code...
  }, [supabaseClient.auth, session]);

  useEffect(() => {
    console.log("check supabase events");
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
    console.log("is session set?", session);

    return () => subscription.unsubscribe();
  }, [supabaseClient]);

  useEffect(() => {
    const iframe = iframeRef.current.contentWindow.document;
    const button = iframe.createElement("button");
    button.textContent = "Sign in with Google";
    iframe.body.appendChild(button);

    button.addEventListener("click", async () => {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: "http://localhost:1234/auth/provider",
        },
      });

      if (error || !data || !data.url) {
        console.error("Error signing in:", error);
        return;
      }

      // open google oauth consent screen in a new tab
      window.open(data.url, "_blank");
    });

    return () => {
      // Cleanup
      button.removeEventListener("click");
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current.contentWindow.document;
    const signOutButton = iframe.createElement("button");
    signOutButton.textContent = "Sign out";
    iframe.body.appendChild(signOutButton);

    signOutButton.addEventListener("click", async () => {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        console.error("Error signing out:", error);
        return;
      }

      console.log("Successfully signed out");
      setSession(null);
    });

    return () => {
      signOutButton.removeEventListener("click");
    };
  }, []);

  return (
    <div>
      <iframe
        ref={iframeRef}
        style={{ height: "200px", width: "300px" }}
      ></iframe>

      {/* <div ref={signInButtonRef}></div>
      <div ref={signOutButtonRef}></div> */}
    </div>
  );
}

export default AuthComponent;
