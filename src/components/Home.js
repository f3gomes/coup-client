import React, { Component } from "react";
import { Link } from "react-router-dom";
import cover from "../assets/cover.jpg";
import RulesModal from "./RulesModal";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="homeContainer">
          <h1>Welcome to Coup</h1>
          <p>A game of deduction and deception</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.amazon.com.br/Mandala-Jogos-MDL0000-Coup-Branco/dp/B07F4G4LJK"
          >
            <img
              src={cover}
              alt="Card box"
              style={{ width: "150px", height: "auto", cursor: "pointer" }}
            />
          </a>
          <div className="input-group-btn">
            <Link className="home hover" to="/create">
              Create Game
            </Link>
          </div>
          <div className="input-group-btn">
            <Link className="home hover" to="/join">
              Join Game
            </Link>
          </div>
          <div>
            <div className="homeModalContainer">
              <RulesModal home={true} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ marginBottom: "12px" }}>
            Made by{" "}
            <a
              className="website-link"
              href="https://github.com/cheneth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ethan Chen
            </a>
          </div>

          <div>
            Translate by{" "}
            <a
              className="website-link"
              href="https://github.com/fomes"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "line-through" }}
            >
              Felipe Gomes
            </a>
            <b>Google Tradutor</b>
          </div>
        </div>
        <p className="version-number">Beta v0.9</p>
      </>
    );
  }
}
