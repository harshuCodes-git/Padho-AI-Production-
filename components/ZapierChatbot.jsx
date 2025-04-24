"use client";

import { useEffect } from "react";

const ZapierChatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-screen h-screen">
      <zapier-interfaces-chatbot-embed
        chatbot-id="cm9sq5yzl00331365qlcksp20"
        style={{
          width: "50%",
          height: "75%",
          border: "none",
        }}
        theme="dark"
      ></zapier-interfaces-chatbot-embed>
    </div>
  );
};

export default ZapierChatbot;
