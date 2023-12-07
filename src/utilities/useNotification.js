import { useState } from "react";

// https://medium.com/@johanpvandongen/temporary-notification-in-react-b3f2e85962d8s
// custom hook for showing notifcation (got it from this url ^^^^)
export default function useNotification(){
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  const showNotification = (text, miliSeconds) => {
    setVisible(true);
    setText(text);
    setTimeout(() => {
      setVisible(false);
    }, miliSeconds);
  };

  return {
    visible,
    text,
    showNotification
  }
}