"use client"; // This is a client component

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    // Ensure the Turnstile callback is defined after the component is mounted
    window.onloadTurnstileCallback = function () {
      turnstile.render("#example-container", {
        sitekey: "0x4AAAAAAA46Nm5LclAodo8R",
        action: "login",
        callback: function (token) {
          console.log(`Challenge Success`);
          console.log(`${token}`);
        },
      });
    };

    // Dynamically load the Turnstile script if needed
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main} id="example-container">        
      </main>
    </div>
  );
}
