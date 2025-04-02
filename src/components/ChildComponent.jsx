import React from "react";
import { useAppContext } from "../context/AppContext";

const ChildComponent = () => {
  const { user, theme } = useAppContext(); // Access global state
  return (
    <div>
      <h1>Hlo, {user}!</h1>
      <p>current theme:{theme}</p>
    </div>
  );
};

export default ChildComponent;
