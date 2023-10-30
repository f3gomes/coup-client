import React, { Component } from "react";

export default class ChallengeDecision extends Component {
  // constructor(props) {
  //     super(props)
  // }

  vote = (isChallenging) => {
    this.props.closeOtherVotes("challenge");

    const res = {
      action: this.props.action,
      isChallenging,
      challengee: this.props.action.source,
      challenger: this.props.name,
    };
    console.log(res);
    this.props.socket.emit("g-challengeDecision", res);
    this.props.doneChallengeVote();
  };

  challengeText = (action, source, target) => {
    if (action === "steal") {
      return (
        <p>
          <b>{source}</b> está tentando roubar de <b>{target}</b>
        </p>
      );
    } else if (action === "tax") {
      return (
        <p>
          <b>{source}</b> está tentando cobrar taxa (3 moedas)
        </p>
      );
    } else if (action === "assassinate") {
      return (
        <p>
          <b>{source}</b> está tentando assassinar <b>{target}</b>
        </p>
      );
    } else if (action === "exchange") {
      return (
        <p>
          <b>{source}</b> está tentando trocar suas cartas
        </p>
      );
    }
  };

  render() {
    return (
      <>
        {this.challengeText(
          this.props.action.action,
          this.props.action.source,
          this.props.action.target
        )}
        <button onClick={() => this.vote(true)}>Contestar</button>
        {/* <button onClick={() => this.vote(false)}>Pass</button> */}
      </>
    );
  }
}
