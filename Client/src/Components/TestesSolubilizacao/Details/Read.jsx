import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';
import LoadingAnimation from '../../Globais/LoadingAnimation';
import $ from "jquery";

class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      data: null,
      loading: true,
      alert: false,
    };
  }

  componentDidMount() {
    this.getTesteSolub(this.props.id);
  }

      /**
     * Adiciona uma nova linha no fim da tabela dos solventes
     */
    adicionaNovaLinha = k => {
      let linha = $('#linha').clone(this);
      linha.find("input").get(0).value = "";
      let radio = linha.find('input:radio');
      for(let i=0; i<radio.length; i++){
          radio.get(i).setAttribute('name',radio.get(i).getAttribute("name").substring(0,18)+k);
          radio.get(i).disabled = true;
      }
      $('tbody').append(linha);
  };


  preencheLinha = i => {
    document.querySelectorAll("#linha")[i].setAttribute("data-id", this.state.data.complementar[i].id);
    document.querySelectorAll("#solventes")[i].value = this.state.data.complementar[i].solvente;
    switch (this.state.data.complementar[i].grauDeEficacia) {
      case "1": 
        document.querySelectorAll("#radio1")[i].checked = true;
        document.querySelectorAll("#radio1")[i].disabled = false;
        break;
      case "2":
        document.querySelectorAll("#radio2")[i].checked = true;
        document.querySelectorAll("#radio2")[i].disabled = false;
        break;
      case "3":
        document.querySelectorAll("#radio3")[i].checked = true;
        document.querySelectorAll("#radio3")[i].disabled = false;
        break;
      case "4":
        document.querySelectorAll("#radio4")[i].checked = true;
        document.querySelectorAll("#radio4")[i].disabled = false;
        break;
      default:
        document.querySelectorAll("#radio5")[i].checked = true;
        document.querySelectorAll("#radio5")[i].disabled = false;
        break;
    }
    document.querySelectorAll("#observacoes")[i].value = this.state.data.complementar[i].observacoes;

  };

  preencheTabela = () => {
    this.preencheLinha(0);
    for (let i = 1; i < this.state.data.complementar.length; i++) {
      this.adicionaNovaLinha(i);
      this.preencheLinha(i);
    }
  };


  async getTesteSolub(id) {

    //Enviar pedido
    const response = await fetch(`/api/testesSolubilizacao/singleTeste/${this.props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          this.setState(prevState => ({
            ...prevState,
            data: resp,
            loading: false
          }));
          this.preencheTabela();
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    }).catch(resp => {
      this.setState(prevState => ({
        ...prevState,
        error: true,
        loading: true,
        alertText: 'Não existe conexão com o servidor.',
        alertisNotVisible: false,
        alertColor: 'danger'
      }))
    });
  }

  render() {
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (!this.state.loading) {
        return (
            <div className="container mb-4">
                <div className="pt-3 py-3 text-center">
                    <h2>Testes de Solventes</h2>
                    <h5>Teste de eficácia dos solventes na limpeza e solubilização de estratos e sujidades</h5>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Identificação do Estrato / Sujidade</label>
                        <input type="text" readOnly className="form-control mb-3 input" id="idEstratoSujidade" 
                         value={this.state.data.resposta[0].idEstratoSujidade} />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label>Características</label>
                        <input type="text" readOnly className="form-control mb-3 input" id="caracteristicas" 
                         value={this.state.data.resposta[0].caracteristicas} />
                    </div>
                </div>
                {/* em falta: tabela de solventes e os graus de eficácia */}
                <table className="table table-bordered table-secondary text-center" id="tabela">
                    <thead>
                        <tr>
                            <th className="align-middle">Solvente ou mistura de solventes</th>
                            <th className="align-middle">Grau de eficácia na solubilização</th>
                            <th className="align-middle">Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    <tr id="linha" data-id="">
                            <td>
                                <textarea readOnly id="solventes" className="form-control input" style={{ resize: "none" }} rows="1" />
                            </td>
                            <td>
                                {/* RADIO BUTTONS */}
                                <div className="form-check form-check-inline">
                                    <input id="radio1" disabled='true' className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="1" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio11">1</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio2" disabled='true' className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="2" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio12">2</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio3" disabled='true' className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="3" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio13">3</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio4" disabled='true' className="form-check-input p-1" type="radio" name="inlineRadioOptions0"  value="4" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio14">4</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio5" disabled='true' className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="5" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio15">5</label>
                                </div>
                            </td>
                            <td>
                                <textarea readOnly id="observacoes" className="form-control input" style={{ resize: "none" }} rows="1" />
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        );
      } else {
        return (
          <div className="container">
            {this.state.alert ?
              <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
              :
              <LoadingAnimation />
            }
          </div>
        );
      }
    };
  }
}

export default Read;