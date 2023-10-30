import React, { Component } from "react";

export default class EventLog extends Component {
  render() {
    return (
      <div
        className="EventLogContainer"
        style={{ fontSize: "14px", height: "200px" }}
      >
        <p className="bold EventLogTitle">Histórico</p>
        <div className="EventLogBody" style={{ height: "200px" }}>
          {this.props.logs.map((x, index) => {
            if (index === this.props.logs.length - 1) {
              return (
                <p key={index} className="new">
                  {x}
                </p>
              );
            }
            return <p key={index}>{x}</p>;
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
      </div>
    );
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
}
