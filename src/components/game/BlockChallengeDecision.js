import React, { Component } from "react";
import { actionsBR, influencesBR } from "../../utils/translate";

export default class BlockChallengeDecision extends Component {
  vote = (isChallenging) => {
    this.props.closeOtherVotes("challenge-block");

    const res = {
      counterAction: this.props.counterAction,
      prevAction: this.props.prevAction,
      isChallenging,
      challengee: this.props.counterAction.source,
      challenger: this.props.name,
    };
    console.log(res);
    this.props.socket.emit("g-blockChallengeDecision", res);
    this.props.doneBlockChallengeVote();
  };

  render() {
    return (
      <>
        {console.log("first", this.props.prevAction.action)}
        <p>
          {this.props.counterAction.source} está tentando bloquear{" "}
          <strong>{actionsBR[this.props.prevAction.action]} </strong>
          de {this.props.prevAction.source} como{" "}
          <strong>{influencesBR[this.props.counterAction.claim]}</strong>
        </p>
        <button onClick={() => this.vote(true)}>Contestar</button>
        {/* <button onClick={() => this.vote(false)}>Pass</button> */}
      </>
    );
  }
}
