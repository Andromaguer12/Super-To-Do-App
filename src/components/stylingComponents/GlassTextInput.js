import { AccountCircleOutlined, VpnKeyOutlined } from "@material-ui/icons";
import React from "react";
import { useState } from "react";

export default function GlassTextInput({
  value,
  type,
  placeholder,
  name,
  style,
  user,
}) {
  const [Focused, setFocused] = useState(false);
  return (
    <div className="glass-text-input-container flex-r-ac-jsb" style={style}>
      {name === "user" && <AccountCircleOutlined style={{ color: "#fff" }} />}
      {name === "password" && <VpnKeyOutlined style={{ color: "#fff" }} />}
      <input
        type={type}
        className="glass-text-input"
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}
