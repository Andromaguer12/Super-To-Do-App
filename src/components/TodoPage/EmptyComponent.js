import React from "react";
import logoicon from "../../assets/icon.png";

export default function EmptyComponent({ favoritesMode }) {
  return (
    <div className="EmptyComponent flex-c-ac-jsb">
      <p id="empty-warning-title">Nada por aqui!</p>
      <img src={logoicon} alt="icon" style={{ width: 50 }} />
      <p id="empty-warning-footer">
        {favoritesMode
          ? "Intenta escribir uno en el campo de abajo"
          : "Ve a la pagina principal para agregar un To Do como favorito"}
      </p>
    </div>
  );
}
