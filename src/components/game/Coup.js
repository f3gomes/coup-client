import React, { Component } from "react";
import ActionDecision from "./ActionDecision";
import ChallengeDecision from "./ChallengeDecision";
import BlockChallengeDecision from "./BlockChallengeDecision";
import PlayerBoard from "./PlayerBoard";
import RevealDecision from "./RevealDecision";
import BlockDecision from "./BlockDecision";
import ChooseInfluence from "./ChooseInfluence";
import ExchangeInfluences from "./ExchangeInfluences";
import EventLog from "./EventLog";
import CheatSheetModal from "../CheatSheetModal";
import RulesModal from "../RulesModal";
import victory from "../../assets/sounds/victory.mp3";
import money from "../../assets/sounds/money.mp3";

import duke from "../../assets/cards/duke.png";
import captain from "../../assets/cards/captain.png";
import assassin from "../../assets/cards/assassin.png";
import contessa from "../../assets/cards/contessa.png";
import ambassador from "../../assets/cards/ambassador.png";

import "./CoupStyles.css";

export default class Coup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action: null,
      blockChallengeRes: null,
      players: [],
      playerIndex: null,
      currentPlayer: "",
      isChooseAction: false,
      revealingRes: null,
      blockingAction: null,
      isChoosingInfluence: false,
      exchangeInfluence: null,
      error: "",
      winner: "",
      playAgain: null,
      logs: [],
      isDead: false,
      waiting: true,
      disconnected: false,
    };

    let audio = new Audio(victory);

    const bind = this;

    this.playAgainButton = (
      <>
        <button
          className="startGameButton hover"
          onClick={() => {
            this.props.socket.emit("g-playAgain");
          }}
        >
          Jogar Novamente
        </button>
      </>
    );

    this.props.socket.on("disconnect", (reason) => {
      this.setState({ disconnected: true });
    });

    this.props.socket.on("g-gameOver", (winner) => {
      bind.setState({ winner: `${winner} venceu!` });
      bind.setState({ playAgain: bind.playAgainButton });

      audio.volume = 0.2;
      setTimeout(() => {
        audio.play();
      }, 1000);
    });
    this.props.socket.on("g-updatePlayers", (players) => {
      bind.setState({ playAgain: null });
      bind.setState({ winner: null });
      players = players.filter((x) => !x.isDead);
      let playerIndex = null;
      for (let i = 0; i < players.length; i++) {
        console.log(players[i].name, this.props.name);
        if (players[i].name === this.props.name) {
          playerIndex = i;
          break;
        }
      }
      if (playerIndex == null) {
        this.setState({ isDead: true });
      } else {
        this.setState({ isDead: false });
      }
      console.log(playerIndex);
      bind.setState({ playerIndex, players });
    });
    this.props.socket.on("g-updateCurrentPlayer", (currentPlayer) => {
      console.log("currentPlayer: ", currentPlayer);
      bind.setState({ currentPlayer });
    });
    this.props.socket.on("g-addLog", (log) => {
      let splitLog = log.split(" ");
      let coloredLog = [];
      coloredLog = splitLog.map((item, index) => {
        let found = null;
        bind.state.players.forEach((player) => {
          if (item === player.name) {
            found = (
              <b key={index} style={{ color: player.color }}>
                {player.name}{" "}
              </b>
            );
          }
        });
        if (found) {
          return found;
        }
        return <>{item + " "}</>;
      });
      bind.state.logs = [...bind.state.logs, coloredLog];
      bind.setState({ logs: bind.state.logs });
    });
    this.props.socket.on("g-chooseAction", () => {
      bind.setState({ isChooseAction: true });
    });
    this.props.socket.on("g-openExchange", (drawTwo) => {
      let influences = [
        ...bind.state.players[bind.state.playerIndex].influences,
        ...drawTwo,
      ];
      bind.setState({ exchangeInfluence: influences });
    });
    this.props.socket.on("g-openChallenge", (action) => {
      if (this.state.isDead) {
        return;
      }
      if (action.source !== bind.props.name) {
        bind.setState({ action });
      } else {
        bind.setState({ action: null });
      }
    });
    this.props.socket.on("g-openBlockChallenge", (blockChallengeRes) => {
      if (this.state.isDead) {
        return;
      }
      if (blockChallengeRes.counterAction.source !== bind.props.name) {
        bind.setState({ blockChallengeRes });
      } else {
        bind.setState({ blockChallengeRes: null });
      }
    });
    this.props.socket.on("g-openBlock", (action) => {
      if (this.state.isDead) {
        return;
      }
      if (action.source !== bind.props.name) {
        bind.setState({ blockingAction: action });
      } else {
        bind.setState({ blockingAction: null });
      }
    });
    this.props.socket.on("g-chooseReveal", (res) => {
      console.log(res);
      bind.setState({ revealingRes: res });
    });
    this.props.socket.on("g-chooseInfluence", () => {
      bind.setState({ isChoosingInfluence: true });
    });
    this.props.socket.on("g-closeChallenge", () => {
      bind.setState({ action: null });
    });
    this.props.socket.on("g-closeBlock", () => {
      bind.setState({ blockingAction: null });
    });
    this.props.socket.on("g-closeBlockChallenge", () => {
      bind.setState({ blockChallengeRes: null });
    });
  }

  deductCoins = (amount) => {
    let res = {
      source: this.props.name,
      amount: amount,
    };
    this.props.socket.emit("g-deductCoins", res);
  };

  doneAction = () => {
    this.setState({
      isChooseAction: false,
    });
  };

  doneChallengeBlockingVote = () => {
    this.setState({ action: null }); //challemge
    this.setState({ blockChallengeRes: null }); //challenge a block
    this.setState({ blockingAction: null }); //block
  };

  closeOtherVotes = (voteType) => {
    if (voteType === "challenge") {
      this.setState({ blockChallengeRes: null }); //challenge a block
      this.setState({ blockingAction: null }); //block
    } else if (voteType === "block") {
      this.setState({ action: null }); //challemge
      this.setState({ blockChallengeRes: null }); //challenge a block
    } else if (voteType === "challenge-block") {
      this.setState({ action: null }); //challemge
      this.setState({ blockingAction: null }); //block
    }
  };

  doneReveal = () => {
    this.setState({ revealingRes: null });
  };

  doneChooseInfluence = () => {
    this.setState({ isChoosingInfluence: false });
  };

  doneExchangeInfluence = () => {
    this.setState({ exchangeInfluence: null });
  };

  pass = () => {
    let audioMoney = new Audio(money);
    if (this.state.action != null) {
      //challengeDecision
      let res = {
        isChallenging: false,
        action: this.state.action,
      };
      let act = res.action.action;
      if (act === "steal" || act === "tax") {
        audioMoney.play();
      }
      this.props.socket.emit("g-challengeDecision", res);
    } else if (this.state.blockChallengeRes != null) {
      //BlockChallengeDecision
      let res = {
        isChallenging: false,
      };
      this.props.socket.emit("g-blockChallengeDecision", res);
    } else if (this.state.blockingAction !== null) {
      let act = this.state.blockingAction.action;
      if (act === "foreign_aid") {
        audioMoney.play();
      }
      //BlockDecision
      const res = {
        action: this.state.blockingAction,
        isBlocking: false,
      };
      console.log(res);
      this.props.socket.emit("g-blockDecision", res);
    }
    this.doneChallengeBlockingVote();
  };

  influenceColorMap = {
    duke: "#D55DC7",
    captain: "#80C6E5",
    assassin: "#2B2B2B",
    contessa: "#E35646",
    ambassador: "#B4CA1F",
  };

  influencesBR = {
    duke: "Duque",
    captain: "Capitão",
    assassin: "Assassino",
    contessa: "Condessa",
    ambassador: "Embaixador",
  };

  influencesImg = {
    duke: duke,
    captain: captain,
    assassin: assassin,
    contessa: contessa,
    ambassador: ambassador,
  };

  render() {
    let actionDecision = null;
    let currentPlayer = null;
    let revealDecision = null;
    let challengeDecision = null;
    let blockChallengeDecision = null;
    let chooseInfluenceDecision = null;
    let blockDecision = null;
    let influences = null;
    let pass = null;
    let coins = null;
    let exchangeInfluences = null;
    let playAgain = null;
    let isWaiting = true;
    let waiting = null;

    if (this.state.isChooseAction && this.state.playerIndex != null) {
      isWaiting = false;
      actionDecision = (
        <ActionDecision
          doneAction={this.doneAction}
          deductCoins={this.deductCoins}
          name={this.props.name}
          socket={this.props.socket}
          money={this.state.players[this.state.playerIndex].money}
          players={this.state.players}
        ></ActionDecision>
      );
    }
    if (this.state.currentPlayer) {
      currentPlayer = (
        <p>
          Vez de <b>{this.state.currentPlayer}</b>
        </p>
      );
    }
    if (this.state.revealingRes) {
      isWaiting = false;
      revealDecision = (
        <RevealDecision
          doneReveal={this.doneReveal}
          name={this.props.name}
          socket={this.props.socket}
          res={this.state.revealingRes}
          influences={
            this.state.players.filter((x) => x.name === this.props.name)[0]
              .influences
          }
        ></RevealDecision>
      );
    }
    if (this.state.isChoosingInfluence) {
      isWaiting = false;
      chooseInfluenceDecision = (
        <ChooseInfluence
          doneChooseInfluence={this.doneChooseInfluence}
          name={this.props.name}
          socket={this.props.socket}
          influences={
            this.state.players.filter((x) => x.name === this.props.name)[0]
              .influences
          }
        ></ChooseInfluence>
      );
    }
    if (
      this.state.action != null ||
      this.state.blockChallengeRes != null ||
      this.state.blockingAction !== null
    ) {
      pass = <button onClick={() => this.pass()}>Aceitar</button>;
    }

    if (this.state.action != null) {
      isWaiting = false;
      challengeDecision = (
        <ChallengeDecision
          closeOtherVotes={this.closeOtherVotes}
          doneChallengeVote={this.doneChallengeBlockingVote}
          name={this.props.name}
          action={this.state.action}
          socket={this.props.socket}
        ></ChallengeDecision>
      );
    }

    if (this.state.exchangeInfluence) {
      isWaiting = false;
      exchangeInfluences = (
        <ExchangeInfluences
          doneExchangeInfluence={this.doneExchangeInfluence}
          name={this.props.name}
          influences={this.state.exchangeInfluence}
          socket={this.props.socket}
        ></ExchangeInfluences>
      );
    }

    if (this.state.blockChallengeRes != null) {
      isWaiting = false;
      blockChallengeDecision = (
        <BlockChallengeDecision
          closeOtherVotes={this.closeOtherVotes}
          doneBlockChallengeVote={this.doneChallengeBlockingVote}
          name={this.props.name}
          prevAction={this.state.blockChallengeRes.prevAction}
          counterAction={this.state.blockChallengeRes.counterAction}
          socket={this.props.socket}
        ></BlockChallengeDecision>
      );
    }

    if (this.state.blockingAction !== null) {
      isWaiting = false;
      blockDecision = (
        <BlockDecision
          closeOtherVotes={this.closeOtherVotes}
          doneBlockVote={this.doneChallengeBlockingVote}
          name={this.props.name}
          action={this.state.blockingAction}
          socket={this.props.socket}
        ></BlockDecision>
      );
    }

    if (this.state.playerIndex != null && !this.state.isDead) {
      influences = (
        <div>
          <h3>Suas cartas</h3>

          <div>
            {this.state.players[this.state.playerIndex].influences.map(
              (influence, index) => {
                return (
                  <div key={index} className="InfluenceUnitContainer">
                    <div>
                      <img
                        src={`${this.influencesImg[influence]}`}
                        alt="Carta"
                      />
                    </div>
                    <span
                      className="circle"
                      style={{
                        marginTop: "2px",
                        backgroundColor: `${this.influenceColorMap[influence]}`,
                      }}
                    ></span>
                    <br></br>
                    <h3>{this.influencesBR[influence]}</h3>
                  </div>
                );
              }
            )}
          </div>
        </div>
      );

      coins = <p>{this.state.players[this.state.playerIndex].money} moedas</p>;
    }

    if (isWaiting && !this.state.isDead) {
      waiting = <p className="MomentEvent">Esperando outros jogadores...</p>;
    }

    if (this.state.disconnected) {
      return (
        <div className="GameContainer">
          <div className="GameHeader">
            <div className="PlayerInfo">
              <p>{this.props.name}</p>
              {coins}
            </div>
            <RulesModal />
            <CheatSheetModal />
          </div>
          <p>Voce foi desconectado!</p>
          <p>Por favor crie outra sala.</p>
        </div>
      );
    }

    return (
      <div className="GameContainer">
        <EventLog logs={this.state.logs}></EventLog>
        <div className="GameHeader">
          <div className="PlayerInfo">
            <p>{this.props.name}</p>
            {coins}
          </div>
          <div className="CurrentPlayer">{currentPlayer}</div>
          <RulesModal />
          <CheatSheetModal />
        </div>
        <div className="InfluenceSection">{influences}</div>
        <PlayerBoard players={this.state.players}></PlayerBoard>
        <div className="DecisionsSection">
          {waiting}
          {revealDecision}
          {chooseInfluenceDecision}
          {actionDecision}
          {exchangeInfluences}
          {challengeDecision}
          {blockChallengeDecision}
          {blockDecision}
          {pass}
          {playAgain}
        </div>
        <b>{this.state.winner}</b>
        {this.state.playAgain}
      </div>
    );
  }
}
