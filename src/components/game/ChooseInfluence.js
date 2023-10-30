import React, { Component } from "react";
import { influencesBR } from "../utils/translate";

export default class ChooseInfluence extends Component {
  selectInfluence = (influence) => {
    // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
    const res = {
      influence: influence,
      playerName: this.props.name,
    };
    console.log(res);
    this.props.socket.emit("g-chooseInfluenceDecision", res);
    this.props.doneChooseInfluence();
  };

  render() {
    const influences = this.props.influences.map((x, index) => {
      return (
        <button id={`${x}`} key={index} onClick={() => this.selectInfluence(x)}>
          {influencesBR[x]}
        </button>
      );
    });
    return (
      <div>
        <p className="DecisionTitle MomentEvent">
          Você foi vítima de um Golpe! Escolha uma carta para perder:
        </p>
        <div>{influences}</div>
      </div>
    );
  }
}
