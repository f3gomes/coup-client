import React, { Component } from "react";
import { actionsBR, influencesBR } from "../../utils/translate";
import ohNo from "../../assets/sounds/oh_no.mp3";
import kill from "../../assets/sounds/kill.mp3";

export default class RevealDecision extends Component {
  constructor(props) {
    super(props);

    this.act = this.props.res.isBlock
      ? this.props.res.counterAction.counterAction
      : this.props.res.action.action;
    this.actionMap = {
      tax: ["duke"],
      assassinate: ["assassin"],
      exchange: ["ambassador"],
      steal: ["captain"],
      block_foreign_aid: ["duke"],
      block_steal: ["ambassador", "captain"],
      block_assassinate: ["contessa"],
    };
  }

  selectInfluence = (influence) => {
    // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
    let audio = new Audio(kill);
    audio.play();
    const res = {
      revealedCard: influence,
      prevAction: this.props.res.action,
      counterAction: this.props.res.counterAction,
      challengee: this.props.res.challengee,
      challenger: this.props.res.challenger,
      isBlock: this.props.res.isBlock,
    };
    console.log(res);
    this.props.socket.emit("g-revealDecision", res);
    this.props.doneReveal();
  };

  render() {
    const influences = this.props.influences.map((x, index) => {
      return (
        <button id={x} key={index} onClick={() => this.selectInfluence(x)}>
          {influencesBR[x]}
        </button>
      );
    });

    let influence1 = this.actionMap[this.act][0];
    let influence2 = this.actionMap[this.act][1];

    return (
      <div>
        <audio src={ohNo} type="audio/mpeg" autoPlay />
        <p>
          A sua ação <b>{actionsBR[this.act]}</b> foi contestada! Se você não
          tiver um(a) {influencesBR[influence1]} {influence2 && "ou"}{" "}
          {influencesBR[influence2]} para revelar, perderá uma carta!{" "}
        </p>
        {influences}
      </div>
    );
  }
}
