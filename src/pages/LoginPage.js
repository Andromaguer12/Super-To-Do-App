import React from "react";
import Typography from "@material-ui/core/Typography";
import "../css/root.css";
import "../css/LoginPage.css";
import logoicon from "../assets/icon.png";
import GlassTextInput from "../components/stylingComponents/GlassTextInput";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { CommonSignIn, createUser } from "../functions/AuthFunctions";
import { useDispatch } from "react-redux";
import { setUser } from "../storage/UserSlice";
import ErrorComp from "../components/stylingComponents/ErrorComp";

export default function LoginPage() {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [ErrorMessage, setErrorMessage] = useState(null);

  const handleErrors = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const Login = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get("user").length > 5 && form.get("password")) {
      setLoading(true);
      CommonSignIn(form.get("user"), form.get("password"))
        .then((user) => {
          dispatch(setUser(user));
          setLoading(false);
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            createUser({ email: form.get("user"), pass: form.get("password") })
              .then(async () => {
                CommonSignIn(form.get("user"), form.get("password"))
                  .then((user) => {
                    dispatch(setUser(user));
                    setLoading(false);
                  })
                  .catch((error) => {
                    handleErrors(error.code);
                    setLoading(false);
                  });
              })
              .catch((error) => handleErrors(error.code));
          } else {
            handleErrors(error.code);
            setLoading(false);
          }
        });
    }
  };

  return (
    <div className="LoginPage flex-r-ac-jfe">
      <div className="LoginContainer flex-c-ac-jsb">
        <div style={{ width: "100%" }}>
          <div className="LoginHeader flex-r-ac-jc">
            <img src={logoicon} style={{ width: "25%" }} alt="logoicon" />
            <div className="flex-c-afs" style={{ margin: "0 20px" }}>
              <p variant="h5" color="secondary">
                Super
              </p>
              <p variant="h5" style={{ fontSize: "60px" }} color="secondary">
                To Do
              </p>
            </div>
          </div>
          <div className="LoginInputsAndButton flex-c-ac-jfs">
            <form
              style={{ width: "100%" }}
              onSubmit={Login}
              className="flex-c-ac-jfs"
            >
              <GlassTextInput placeholder="Usuario..." name="user" />
              <GlassTextInput
                type="password"
                style={{ marginTop: "20px" }}
                placeholder="Contraseña"
                name="password"
              />
              <button type="submit" className="LoginButton">
                {Loading ? <CircularProgress color="secondary" /> : "Iniciar"}
              </button>
            </form>
          </div>
        </div>
        <div>
          {ErrorMessage && <ErrorComp error={ErrorMessage} />}
          <p
            variant="h5"
            style={{
              color: "#ffffff",
              margin: "20px 0",
              boxSizing: "border-box",
            }}
            color="secondary"
          >
            Prueba Inicial | Andres Carrasquero | 2022 ©
          </p>
        </div>
      </div>
    </div>
  );
}
