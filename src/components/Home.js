import React, { Component } from "react";
import { Link } from "react-router-dom";
import cover from "../assets/cover.png";
import RulesModal from "./RulesModal";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="homeContainer">
          <h1>Bem-vindo ao Coup</h1>
          <p>Um jogo de dedução e engano</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.amazon.com.br/Mandala-Jogos-MDL0000-Coup-Branco/dp/B07F4G4LJK"
          >
            <img src={cover} alt="Card box" className="coverImg" />
          </a>
          <div className="input-group-btn">
            <Link className="createBtn hover" to="/create">
              Criar Jogo
            </Link>
          </div>
          <div className="input-group-btn">
            <Link className="joinBtn hover" to="/join">
              Entrar
            </Link>
          </div>
          <div>
            <div className="homeModalContainer">
              <RulesModal home={true} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div>
            Feito por{" "}
            <a
              className="website-link"
              href="https://github.com/cheneth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ethan Chen
            </a>
          </div>

          <span>
            Traduzido por{" "}
            <a
              className="website-link"
              href="https://github.com/fomes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Felipe Gomes
            </a>
            <b> Google Tradutor</b>
          </span>

          <div>
            <p className="version-number">Beta v1.9</p>
          </div>
        </div>
      </>
    );
  }
}
