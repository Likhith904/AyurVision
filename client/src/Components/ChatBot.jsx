import { useState } from "react";
import logo from "../images/chatbot_8943377.svg";
const ChatBot = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <div>
        {toggle && (
          <iframe
            src="http://localhost:8000"
            width="400"
            height="500"
            title="chat box"
          ></iframe>
        )}
      </div>
      <div>
        {" "}
        <button
          onClick={handleClick}
          style={{ border: "none", background: "transparent" }}
        >
          {" "}
          <img
            src={logo}
            alt="Chatbot Toggle Button"
            style={{ width: "50px", height: "50px" }}
          />{" "}
        </button>{" "}
      </div>
    </div>
  );
};
export default ChatBot;
