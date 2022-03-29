import React from "react";
import { IconButton, Button, Popper } from "@material-ui/core";
import {
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
  StarOutline,
  Delete,
  Star,
} from "@material-ui/icons";
import { useState } from "react";
import { getDateFromTimestamp } from "../../functions/utils";
import { userDataRef } from "../../constants/FirebaseRefs";
import { AuthInstance } from "../../functions/AuthFunctions";
import { useEffect } from "react";

function TodoComponent({ todoObject }) {
  const [Loading, setLoading] = useState(false);
  const [Checked, setChecked] = useState(
    todoObject.checked ? todoObject.checked : false
  );
  const [anchorEl, setanchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [Favorite, setFavorite] = useState(
    todoObject.favorite ? todoObject.favorite : false
  );

  useEffect(() => {
    setFavorite(todoObject.favorite ? todoObject.favorite : false);
    setChecked(todoObject.checked ? todoObject.checked : false);
  }, [todoObject]);

  const ref = userDataRef
    .doc(`${AuthInstance.currentUser.email}`)
    .collection("ToDos")
    .doc(`${todoObject.id}`);

  const setTodoChecked = () => {
    ref.update({
      checked: !Checked,
    });
  };

  const setTodoFavorite = () => {
    ref.update({
      favorite: !Favorite,
    });
  };

  const deleteTodo = () => {
    return new Promise((response, reject) => {
      ref
        .delete()
        .then(() => {
          response(true);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <div className="TodoCard flex-c-afs">
      <div className="TodoCardHeader flex-r-ac-jsb">
        <IconButton onClick={setTodoChecked} size="small">
          {Checked ? (
            <RadioButtonCheckedOutlined />
          ) : (
            <RadioButtonUncheckedOutlined />
          )}
        </IconButton>
        <p
          className="TodoText"
          style={{ textDecoration: Checked ? "line-through" : "none" }}
        >
          {todoObject.content}
        </p>
        <IconButton onClick={setTodoFavorite} size="small">
          {Favorite ? (
            <Star style={{ color: "orange" }} />
          ) : (
            <StarOutline style={{ color: "orange" }} />
          )}
        </IconButton>
      </div>
      <div className="TodoData flex-r-ac-jfe">
        <Popper
          open={open}
          placement="top"
          style={{ zIndex: "3" }}
          anchorEl={anchorEl}
        >
          <div className="AcceptAndDeny">
            <p
              className="TodoText"
              style={{ width: "100%", marginBotttom: 10 }}
            >
              ¿Esta seguro de eliminar?
            </p>
            <div className="flex-r-ac-jsb">
              <Button variant="outlined" color="secondary">
                Cancelar
              </Button>
              <Button
                onClick={async (e) => {
                  setLoading(true);
                  await deleteTodo()
                    .then(() => {
                      setanchorEl(null);
                      setLoading(false);
                    })
                    .catch((error) => setanchorEl(null));
                }}
                variant="contained"
                color="secondary"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </Popper>
        <IconButton onClick={(e) => setanchorEl(e.target)} size="small">
          <Delete />
        </IconButton>
        <p className="TodoTimestamp">
          {getDateFromTimestamp(todoObject.timestamp).date} |{" "}
          {getDateFromTimestamp(todoObject.timestamp).hour}
        </p>
      </div>
    </div>
  );
}

export default React.memo(TodoComponent);
