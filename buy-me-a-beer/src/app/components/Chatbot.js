'use client';
import { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
    // Add chatbot config to window
    window.embeddedChatbotConfig = {
      chatbotId: "pcahnNAowYGdQHpnpSK7G",
      domain: "www.chatbase.co"
    };

    // Create and append script element
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute('chatbotId', "pcahnNAowYGdQHpnpSK7G");
    script.setAttribute('domain', "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
} 