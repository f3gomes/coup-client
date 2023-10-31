import React, { Component } from "react";
import { influencesBR } from "../../utils/translate";
import kill from "../../assets/sounds/kill.mp3";

export default class ChooseInfluence extends Component {
  selectInfluence = (influence) => {
    // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
    let audio = new Audio(kill);
    const res = {
      influence: influence,
      playerName: this.props.name,
    };
    console.log(res);
    this.props.socket.emit("g-chooseInfluenceDecision", res);
    this.props.doneChooseInfluence();
    audio.play();
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
          Escolha uma carta para perder:
        </p>
        <div>{influences}</div>
      </div>
    );
  }
}
