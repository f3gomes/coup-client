import React, { Component } from "react";
import ReactModal from "react-modal";

export default class RulesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRulesModal: false,
    };
  }

  handleOpenRulesModal = () => {
    this.setState({ showRulesModal: true });
  };

  handleCloseRulesModal = () => {
    this.setState({ showRulesModal: false });
  };

  render() {
    let modal = (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.state.showRulesModal}
        contentLabel="Minimal Modal Example"
        onRequestClose={this.handleCloseRulesModal}
        shouldCloseOnOverlayClick={true}
      >
        <div className="CloseModalButtonContainer">
          <button
            className="CloseModalButton"
            onClick={this.handleCloseRulesModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
            >
              <g
                id="more_info"
                data-name="more info"
                transform="translate(-39 -377)"
              >
                <g
                  id="Ellipse_1"
                  data-name="Ellipse 1"
                  className="cls-5"
                  transform="translate(39 377)"
                >
                  <circle className="cls-7" cx="10.5" cy="10.5" r="10.5" />
                  <circle className="cls-8" cx="10.5" cy="10.5" r="10" />
                </g>
                <text id="x" className="cls-6" transform="translate(46 391)">
                  <tspan x="0" y="0">
                    x
                  </tspan>
                </text>
              </g>
            </svg>
          </button>
        </div>

        <div className="RulesContainer">
          <div className="RulesContent">
            <h2>Regras</h2>
            <p>2-6 jogadores</p>
            <p>
              No seu turno, você pode escolher uma ação para jogar. A ação que
              você escolher pode ou não corresponder às carta que você possuir.
              Para a ação que você escolher, outros jogadores podem
              potencialmente bloqueá-lo ou desafiá-lo.{" "}
            </p>
            <p>
              <b>Desafio</b>: Quando um jogador declara uma ação, ele é
              declarando ao resto dos jogadores que eles têm um certo
              influência, e qualquer outro jogador pode desafiá-la. Quando um
              jogador é desafiado, o jogador desafiado deve revelar o correto
              influência associada à sua ação. Se eles revelarem o correto
              influência, o jogador desafiante perderá influência. No entanto,
              se eles não conseguirem revelar a influência correta, o jogador
              desafiado perderão sua influência revelada incorretamente.
            </p>
            <p>
              <b>Bloquear</b>: Quando qualquer uma das ações "Ajuda Externa",
              "Roubar", e "Assassinar" são usados, eles podem ser bloqueados.
              Mais uma vez, qualquer o jogador pode alegar ter a influência
              correta para bloquear. No entanto, os blocos também podem ser
              desafiados por qualquer jogador. Se um bloco falhar, o ação
              original ocorrerá.
            </p>
            <p>
              Se um jogador perder todas as suas cartas, ele estará fora do
              jogo. O último jogador em pé vence!
            </p>
            <p>
              Neste momento, caso um jogador se desconecte, o jogo deverá ser
              recriado.
            </p>
            <h2>Cartas</h2>
            <h3>Capitão</h3>
            <p>
              <b id="captain-color">ROUBAR</b>: Rouba duas moedas de um alvo.
              Pode ser bloqueado por: <hl id="captain-color">Capitão</hl> or{" "}
              <hl id="ambassador-color">Embaixador</hl>. Pode bloquear:{" "}
              <hl id="captain-color">ROUBAR</hl>
            </p>
            <hr />
            <h3>Assassino</h3>
            <p>
              <b id="assassin-color">ASSASINAR</b>: Pague 3 moedas para escolher
              um alvo para assassinar (o alvo perde uma influência). Pode ser
              bloqueado por: <hl id="contessa-color">Condessa</hl>.
            </p>
            <hr />
            <h3>Duque</h3>
            <p>
              <b id="duke-color">TAXAR</b>: Colete 3 moedas do tesouro. Não pode
              ser bloqueado. Pode bloquear ajuda externa.
            </p>
            <hr />
            <h3>Embaixador</h3>
            <p>
              <b id="ambassador-color">TROCAR </b>: Escolha 2 influencia em seu
              Mãe e escolha duas carta para recuperar. Não pode ser bloqueado.
              Pode bloquear <hl id="captain-color">ROUBAR</hl>
            </p>
            <hr />
            <h3>Condessa</h3>
            <p>
              <b id="contessa-color">BLOQUEAR ASSASSINO</b>: Can block{" "}
              <b id="assassin-color">assassinations</b>. Não pode ser bloqueado.
            </p>
            <hr />
            <h3>Outras ações</h3>
            <p>
              <b> Renda </b>: Colete 1 moeda do tesouro. Não pode ser bloqueado.
            </p>
            <p>
              <b> Ajuda externa </b>: colete 2 moedas do tesouro. Bloqueável por{" "}
              <hl id="duke-color">Duque</hl>.
            </p>
            <p>
              <b> Golpe </b>: Pague 7 moedas e escolha um alvo para perder uma
              carta. Se um jogador começar sua vez com 10 ou mais moedas, ele é
              obrigado a dar um Golpe. Não pode ser bloqueado.
            </p>
          </div>
        </div>
      </ReactModal>
    );
    if (this.props.home) {
      return (
        <>
          <div className="HomeRules" onClick={this.handleOpenRulesModal}>
            <p>Regras </p>
            <svg
              className="InfoIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 21 22"
            >
              <g
                id="more_info"
                data-name="more info"
                transform="translate(-39 -377)"
              >
                <g
                  id="Ellipse_1"
                  data-name="Ellipse 1"
                  className="cls-1"
                  transform="translate(39 377)"
                >
                  <circle className="cls-3" cx="10.5" cy="10.5" r="10.5" />
                  <circle className="cls-4" cx="10.5" cy="10.5" r="10" />
                </g>
                <text id="i" className="cls-2" transform="translate(48 393)">
                  <tspan x="0" y="0">
                    i
                  </tspan>
                </text>
              </g>
            </svg>
          </div>
          {modal}
        </>
      );
    }
    return (
      <>
        <div className="Rules" onClick={this.handleOpenRulesModal}>
          <p>Regras </p>
          <svg
            className="InfoIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 21 22"
          >
            <g
              id="more_info"
              data-name="more info"
              transform="translate(-39 -377)"
            >
              <g
                id="Ellipse_1"
                data-name="Ellipse 1"
                className="cls-1"
                transform="translate(39 377)"
              >
                <circle className="cls-3" cx="10.5" cy="10.5" r="10.5" />
                <circle className="cls-4" cx="10.5" cy="10.5" r="10" />
              </g>
              <text id="i" className="cls-2" transform="translate(48 393)">
                <tspan x="0" y="0">
                  i
                </tspan>
              </text>
            </g>
          </svg>
        </div>
        {modal}
      </>
    );
  }
}
