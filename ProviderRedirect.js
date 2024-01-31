import React, { useEffect } from "react";

function ProviderRedirect() {

  useEffect(() => {
    window.location.href = "https://getalai.com";
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}


export default ProviderRedirect;