import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../storage/UserSlice";
import "../css/TodosPageContainer.css";
import { Avatar, Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import usericon from "../assets/user.png";
import logoicon from "../assets/icon.png";
import SendToDoInput from "../components/stylingComponents/SendToDoInput";
import { userDataRef } from "../constants/FirebaseRefs";
import { AuthInstance } from "../functions/AuthFunctions";
import "../css/root.css";
import "../css/LoginPage.css";
import { useEffect } from "react";
import TodoComponent from "../components/TodoPage/TodoComponent";
import EmptyComponent from "../components/TodoPage/EmptyComponent";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { Allroutes } from "./routes/allroutes";

export default function TodosPage() {
  const user = useSelector(getUser);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [FavoriteTodos, setFavoriteTodos] = useState(false);

  const handleErrors = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    userDataRef
      .doc(`${AuthInstance.currentUser.email}`)
      .collection("ToDos")
      .where("favorite", "==", true)
      .onSnapshot((snapshot) => {
        const favorites = [];
        snapshot.forEach((doc) => {
          favorites.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFavoriteTodos(favorites);
      });
  }, []);

  return (
    <div className="TodosPageContainer flex-c-ac-jsb">
      <CSSTransition in={true} classNames="todos-header" timeout={500}>
        <div className="TodosHeader flex-c-ac-jsb">
          <div className="flex-r-ac-jsb" style={{ width: "100%" }}>
            <div className="UserCard flex-r-ac-jsb">
              <Avatar
                src={usericon}
                style={{ background: "#fff", width: 65, height: 65 }}
              />
              <div
                className="flex-c-afs"
                id="user-data"
                style={{ marginLeft: "10px" }}
              >
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <Link
              className="linkFavorites"
              to={Allroutes.todos}
              style={{ textDecoration: "none" }}
            >
              <Button color="seconadary" variant="outlined" endIcon={<Check />}>
                To Do
              </Button>
            </Link>
            <div
              className="LoginHeader flex-r-ac-jc"
              style={{ marginTop: 0, width: "fit-content" }}
            >
              <img src={logoicon} style={{ width: 65 }} alt="logoicon" />
              <div className="flex-c-afs" style={{ margin: "0 20px" }}>
                <p variant="h5" color="secondary">
                  Super
                </p>
                <p variant="h5" style={{ fontSize: "30px" }} color="secondary">
                  To Do
                </p>
              </div>
            </div>
          </div>
          <div className="linkFavorites-responsive flex-c-ac-jc">
            <Link to={Allroutes.todos} style={{ textDecoration: "none" }}>
              <Button color="seconadary" variant="outlined" endIcon={<Check />}>
                To Do
              </Button>
            </Link>
          </div>
        </div>
      </CSSTransition>
      <div className="TodosContainer flex-c-ac-jsb">
        <CSSTransition in={true} classNames="todo-card" timeout={500}>
          <div
            className="TodosList flex-c-ac-jfs"
            id="todos-list"
            style={{
              justifyContent:
                FavoriteTodos.length === 0 ? "center" : "flex-start",
            }}
          >
            {FavoriteTodos.length > 0 &&
              FavoriteTodos.sort(
                (prev, next) => prev.timestamp - next.timestamp
              )
                .reverse()
                .map((todo) => {
                  return <TodoComponent todoObject={todo} key={todo.id} />;
                })}
            {FavoriteTodos.length === 0 && <EmptyComponent favoritesMode />}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
