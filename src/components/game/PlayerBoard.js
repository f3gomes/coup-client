import React from "react";
import "./PlayerBoardStyles.css";
import { Icon } from "@iconify/react";

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

        <div>
          <span>
            <p>{player.money}</p>
            <Icon icon="noto:coin" />
          </span>

          <span>
            <p>{player.influences.length}</p>
            <Icon icon="fxemoji:flowerplayingcards" />
          </span>
        </div>
      </div>
    ));
  }
  return <div className="PlayerBoardContainer">{boardItems}</div>;
}
