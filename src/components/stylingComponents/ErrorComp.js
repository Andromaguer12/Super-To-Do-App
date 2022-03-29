import React from "react";
import { Help } from "@material-ui/icons";

export default function ErrorComp({ error }) {
  return (
    <div className="error-card flex-r-ac-jsb">
      <Help style={{ color: "#fff" }} />
      <p style={{ color: "#fff", maxWidth: "80%" }}>{error}</p>
    </div>
  );
}
