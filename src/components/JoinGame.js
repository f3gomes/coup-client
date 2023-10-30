import React, { Component } from "react";
import io from "socket.io-client";
import Coup from "./game/Coup";

const axios = require("axios");
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export default class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      roomCode: "",
      players: [],
      isInRoom: false,
      isReady: false,
      isLoading: false,
      isError: false,
      isGameStarted: false,
      errorMsg: "",
      socket: null,
    };
  }

  onNameChange = (name) => {
    this.setState({ name });
  };

  onCodeChange = (roomCode) => {
    this.setState({ roomCode });
  };

  joinParty = () => {
    const bind = this;
    const socket = io(`${baseUrl}/${this.state.roomCode}`);
    this.setState({ socket });
    console.log("socket created");
    socket.emit("setName", this.state.name);

    socket.on("joinSuccess", function () {
      console.log("join successful");
      // bind.setState({ isLoading: false });
      bind.setState({ isInRoom: true });
    });

    socket.on("joinFailed", function (err) {
      console.log("join failed, cause: " + err);
      bind.setState({
        errorMsg: err,
        isError: true,
        isLoading: false,
      });
      socket.disconnect();
    });

    socket.on("startGame", () => {
      this.setState({ isGameStarted: true });
    });

    socket.on("partyUpdate", (players) => {
      console.log(players);
      this.setState({ players });
      if (
        players.length >= 3 &&
        players.map((x) => x.isReady).filter((x) => x === true).length ===
          players.length
      ) {
        //TODO CHANGE 2 BACK TO 3
        this.setState({ canStart: true });
      } else {
        this.setState({ canStart: false });
      }
    });

    socket.on("disconnected", function () {
      console.log("You've lost connection with the server");
    });
  };

  attemptJoinParty = () => {
    if (this.state.name === "") {
      //TODO  handle error
      console.log("Digite seu nick!");
      this.setState({
        errorMsg: "Digite seu nick",
        isError: true,
      });
      return;
    }
    if (this.state.roomCode === "") {
      //TODO  handle error
      console.log("Please enter a room code");
      this.setState({
        errorMsg: "Por favor, insira um código de sala",
        isError: true,
      });
      return;
    }

    this.setState({ isLoading: true });
    const bind = this;
    axios
      .get(`${baseUrl}/exists/${this.state.roomCode}`)
      .then(function (res) {
        console.log(res);
        if (res.data.exists) {
          //join
          console.log("joining");
          bind.setState({ errorMsg: "" });
          bind.joinParty();
        } else {
          //TODO  handle error
          console.log("Código inválido!");
          bind.setState({
            isLoading: false,
            errorMsg: "Código inválido!",
            isError: true,
          });
        }
      })
      .catch(function (err) {
        //TODO  handle error
        console.log("error in getting exists", err);
        bind.setState({
          isLoading: false,
          errorMsg: "Server error",
          isError: true,
        });
      });
  };

  reportReady = () => {
    this.state.socket.emit("setReady", true);
    this.state.socket.on("readyConfirm", () => {
      this.setState({ isReady: true });
    });
  };

  render() {
    if (this.state.isGameStarted) {
      return <Coup name={this.state.name} socket={this.state.socket}></Coup>;
    }
    let error = null;
    let joinReady = null;
    let ready = null;
    if (this.state.isError) {
      error = <b>{this.state.errorMsg}</b>;
    }
    if (this.state.isInRoom) {
      joinReady = (
        <button
          className="joinButton"
          onClick={this.reportReady}
          disabled={this.state.isReady}
        >
          Estou pronto!
        </button>
      );
    } else {
      joinReady = (
        <button
          className="joinButton hover"
          onClick={this.attemptJoinParty}
          disabled={this.state.isLoading}
        >
          {this.state.isLoading ? "Entrando..." : "Entrar"}
        </button>
      );
    }
    if (this.state.isReady) {
      ready = <b>Você está pronto!</b>;
      joinReady = null;
    }

    return (
      <div className="joinGameContainer">
        <input
          name="nick"
          type="text"
          placeholder="Nick"
          value={this.state.name}
          disabled={this.state.isLoading}
          onChange={(e) => {
            if (e.target.value.length <= 8) {
              this.setState({
                errorMsg: "",
                isError: false,
              });
              this.onNameChange(e.target.value);
            } else {
              this.setState({
                errorMsg: "O nome deve ter menos que 9 caracteres",
                isError: true,
              });
            }
          }}
        />
        <input
          name="room"
          type="text"
          placeholder="Sala"
          value={this.state.roomCode}
          disabled={this.state.isLoading}
          onChange={(e) => this.onCodeChange(e.target.value)}
        />

        {joinReady}
        {ready}
        {error}
        <div className="readyUnitContainer">
          {this.state.players.map((item, index) => {
            let ready = null;
            let readyUnitColor = "#E46258";
            if (item.isReady) {
              ready = <b>Pronto!</b>;
              readyUnitColor = "#73C373";
            } else {
              ready = <b>Aguardando...</b>;
            }
            return (
              <div
                className="readyUnit"
                style={{ backgroundColor: readyUnitColor }}
                key={index}
              >
                <p>
                  {index + 1}. {item.name} {ready}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
