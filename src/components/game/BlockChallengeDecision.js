import React, { Component } from "react";

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
        <p>
          {this.props.counterAction.source} está tentando bloquear{" "}
          {this.props.prevAction.action} de {this.props.prevAction.source} como{" "}
          {this.props.counterAction.claim}
        </p>
        <button onClick={() => this.vote(true)}>Contestar</button>
        {/* <button onClick={() => this.vote(false)}>Pass</button> */}
      </>
    );
  }
}
