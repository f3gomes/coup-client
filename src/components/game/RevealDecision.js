import React, { Component } from "react";
import { influencesBR } from "../utils/translate";

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

    return (
      <div>
        <p>
          A sua ação <b>{this.act}</b> foi contestada! Se você não tiver um(a){" "}
          {this.actionMap[this.act].join(" or ")} para revelar, perderá uma
          carta!{" "}
        </p>
        {influences}
      </div>
    );
  }
}
