import React, { Component } from "react";
import "./CoupStyles.css";
import money from "../../assets/sounds/money.mp3";

let audio = new Audio(money);

export default class ActionDecision extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDecisionMade: false,
      decision: "",
      isPickingTarget: false,
      targetAction: "",
      actionError: "",
    };
  }

  chooseAction = (action, target = null) => {
    if (action === "income") {
      audio.play();
    }

    const res = {
      action: {
        action: action,
        target: target,
        source: this.props.name,
      },
    };
    console.log(res);

    this.props.socket.emit("g-actionDecision", res);
    this.props.doneAction();
  };

  deductCoins = (action) => {
    console.log(this.props.money, action);
    if (action === "assassinate") {
      if (this.props.money >= 3) {
        this.props.deductCoins(3);
        this.pickingTarget("assassinate");
      } else {
        this.setState({ actionError: "Precisa de 3 moedas!" });
      }
    } else if (action === "coup") {
      if (this.props.money >= 7) {
        this.props.deductCoins(7);
        this.pickingTarget("coup");
      } else {
        this.setState({ actionError: "Precisa de 7 moedas!" });
      }
    }
  };

  pickingTarget = (action) => {
    this.setState({
      isPickingTarget: true,
      targetAction: action,
      actionError: "",
    });
    this.setState({ targetAction: action });
  };

  pickTarget = (target) => {
    this.chooseAction(this.state.targetAction, target);
  };

  render() {
    let controls = null;

    if (this.state.isPickingTarget) {
      controls = this.props.players
        .filter((x) => !x.isDead)
        .filter((x) => x.name !== this.props.name)
        .map((x, index) => {
          return (
            <button
              key={index}
              style={{ backgroundColor: x.color }}
              onClick={() => this.pickTarget(x.name)}
            >
              {x.name}
            </button>
          );
        });
    } else if (this.props.money < 10) {
      controls = (
        <div>
          <button
            className="tooltip"
            onClick={() => this.chooseAction("income")}
          >
            <span>Renda</span>
            <span className="tooltip-text">
              +1 do tesouro <br />
              Sem contestação
            </span>
          </button>
          <button
            className="tooltip"
            onClick={() => this.chooseAction("foreign_aid")}
          >
            <span>Ajuda Externa</span>
            <span className="tooltip-text">
              +2 do tesouro <br /> 🚫 Duque
            </span>
          </button>
          <button className="tooltip" onClick={() => this.deductCoins("coup")}>
            {" "}
            <span>Golpe</span>
            <span className="tooltip-text">
              Matar um alvo <br />
              Sem contestação <br /> 💰 7
            </span>
          </button>
          <button
            className="tooltip"
            id="captain"
            onClick={() => this.pickingTarget("steal")}
          >
            <span>Roubar</span>
            <span>(Capitão)</span>
            <span className="tooltip-text">
              Rouba +2 de um alvo
              <br /> 🚫 Capitão
              <br /> 🚫 Embaixador
            </span>
          </button>
          <button
            className="tooltip"
            id="assassin"
            onClick={() => this.deductCoins("assassinate")}
          >
            <span>Assassinar</span>
            <span>(Assassino)</span>
            <span className="tooltip-text">
              Matar um alvo <br /> 💰 3
            </span>
          </button>
          <button
            className="tooltip"
            id="duke"
            onClick={() => this.chooseAction("tax")}
          >
            <span>Taxar</span>
            <span>(Duque)</span>
            <span className="tooltip-text">+3 do tesouro</span>
          </button>
          <button
            className="tooltip"
            id="ambassador"
            onClick={() => this.chooseAction("exchange")}
          >
            <span>Trocar</span>
            <span>(Embaixador)</span>
            <span className="tooltip-text">Trocar as cartas</span>
          </button>
        </div>
      );
    } else {
      //money over 10, has to coup
      controls = (
        <button onClick={() => this.deductCoins("coup")}>Golpe</button>
      );
    }

    return (
      <>
        <p className="DecisionTitle MomentEvent">Escolher ação/alvo:</p>
        <div className="DecisionButtonsContainer">
          {controls}
          <p>{this.state.actionError}</p>
        </div>
      </>
    );
  }
}
