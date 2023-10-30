import React from "react";
import "./PlayerBoardStyles.css";

export default function PlayerBoard(props) {
  let boardItems = null;
  if (props.players.length > 1) {
    boardItems = props.players.map((player, index) => (
      <div
        key={index}
        className="PlayerBoardItem"
        style={{ backgroundColor: `${player.color}` }}
      >
        <h2>{player.name}</h2>
        <p>{player.money} moedas</p>
        <p>{player.influences.length} cartas</p>
      </div>
    ));
  }
  return <div className="PlayerBoardContainer">{boardItems}</div>;
}
