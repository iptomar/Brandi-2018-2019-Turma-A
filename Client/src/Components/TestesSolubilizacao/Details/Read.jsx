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
    this.handleChange = this.handleChange.bind(this);
    this.voltar = this.voltar.bind(this);
  }


  async queryState(query) {
    if (query !== undefined) {
      switch (query) {
        case '&atualizado':
          this.setState({
            alertText: "Teste de solubilização atualizado com sucesso!",
            alertisNotVisible: false,
            alertColor: "success"
          });
          console.log(query);
          break;
        default:
          window.location = `/testesSolubilizacao/${this.props.id}/detalhes`;
          break;
      }
    }
  }



    // Controla as alterações nos inputs (Necessidade do React)
    handleChange(e) {
      let name = e.target.name;
      let value = e.target.value;
      this.setState(prevState => ({
        data: {
          resposta : [
            {
              ...prevState.data.resposta[0],
              [name]: value
            }
          ]
        }
      }));
    }

  componentDidMount() {
    this.getTesteSolub(this.props.id);
    this.queryState(this.props.query);
  }

  voltar(){
    window.location = `/testesSolubilizacao/${this.props.id}/detalhes`;
  }

  submit = async e => {
      e.preventDefault();
    /* Seleciona todos os inputs da tabela */
    let inputs = document.querySelectorAll("textarea");
    for (let i = 0; i < inputs.length; i++) {
      /* Se os inputs estiverem vazios */
      if (inputs[i].value === "") {
        this.setState({
          alertText:
            "Existem campos dos Teste de Solubilização que não foram preenchidos!",
          alertisNotVisible: false,
          alertColor: "warning"
        });
        return;
      }
    }
    /* Neste momento, todos os inputs estão preenchidos */
    let tab = [];
    /* Iterar da 2.ª linha da tabela até ao fim */
    for (let i = 0; i < document.getElementById("tabela").children[1].childElementCount;i++) {
      let content = document.getElementById("tabela").children[1].children[i];
        tab.push({
              /* Campos da tabela */
              testeSolubilizacaoID: content.getAttribute("data-id"),
              solventeMistura: content.children[0].children[0].value,
              grauEficacia: $('input[name=inlineRadioOptions'+i+']:checked').val(),
              observacoes: content.children[2].children[0].value,
            
        });
    }
    let dados = {caracteristicas: this.state.data.resposta[0].caracteristicas, idEstratoSujidade: this.state.data.resposta[0].idEstratoSujidade};
    let total = [dados, tab];
    /* Enviar para a API */
    const response = await fetch(`/api/testesSolubilizacao/${this.props.id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      },
      body: JSON.stringify(total)
    });
    /* Aguardar a resposta da API e avaliar o que fazer */
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Updated":
          window.location = `/testesSolubilizacao/${this.props.id}/detalhes/&atualizado`;
          break;
        case "Error":
          this.setState({
            alertText: "Erro",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        default:
          console.log("Ocorreu um erro, contacte o administrador do sistema");
      }
    });
  };



      /**
     * Adiciona uma nova linha no fim da tabela dos solventes
     */
    adicionaNovaLinha = (k, nova) => {
      let linha = $('#linha').clone(this);
      linha.attr("data-id", "");
      let radio = linha.find('input:radio');    
      let textArea = linha.find("textarea");
      for (let i = 0; i < textArea.length; i++) {
        textArea.get(i).value = "";
      }
      let a = document.querySelector("#tabela").children[1].childElementCount+2;
      for(let i=0; i<radio.length; i++){
        if(k != null) radio.get(i).setAttribute('name',radio.get(i).getAttribute("name").substring(0,18)+k); 
        else radio.get(i).setAttribute('name',radio.get(i).getAttribute("name").substring(0,18)+a);
          if(nova){
            radio.get(i).disabled = true;
          }
      }
      $('tbody').append(linha);
  };

  /**
   * Elimina a última linha na tabela dos testes de solubilidade
   */

  eliminaUltimaLinha = () => {
    var table = document.getElementById("tabela");
    var numRows = table.rows.length;
    if (numRows >= 3) {
      table.deleteRow(-1);
    }
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
      this.adicionaNovaLinha(i, true);
      this.preencheLinha(i);
    }
  };
   /**
   * Método que transforma a página dos detalhes para a página da edição
   */
  changeToEdit() {
    $("input:radio").attr("disabled", false);
    //Remove o atributo readonly nos input e nas textarea
    $("input, textarea").removeAttr("readonly");
    const btEditar = document.getElementById("btEditar");
    btEditar.style.display = "none";
    
    $("#btVoltar").removeAttr("hidden");
    // Apresentar todo o conteudo que foi escondido na apresentação
    $("#editarF").show();
  }

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
          console.log("Occoreu um problema técnica, contacte a equipa de IT");
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
            <div className="row mb-3">
                <div className="col-md-10 mr-0 text-center">
                    <h2>Testes de Solubilização</h2>
                    <h5>Teste de eficácia dos solventes na limpeza e solubilização de estratos e sujidades</h5>
                </div>
                <div className="mt-3 col-md-2">
                <button
                  id="btEditar"
                  className="btn btn-success"
                  onClick={this.changeToEdit}
                  style={{bottom:0, right:15, position:"absolute"}}
                >
                  Editar
                </button>
                <button
                  id="btVoltar" hidden
                  className="btn btn-success"
                  onClick={this.voltar}
                  style={{bottom:0, right:15, position:"absolute"}}
                >
                  Voltar
                </button>
                
              </div>
              <div className="col-md-12 w-100">
              <AlertMsg
                text={this.state.alertText}
                isNotVisible={this.state.alertisNotVisible}
                alertColor={this.state.alertColor}
              /></div>
              </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Identificação do Estrato / Sujidade</label>
                        <input type="text" readOnly className="form-control mb-3 input" name="idEstratoSujidade" id="idEstratoSujidade" 
                         value={this.state.data.resposta[0].idEstratoSujidade} 
                         onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label>Características</label>
                        <input type="text" readOnly  className="form-control mb-3 input" name="caracteristicas" id="caracteristicas" 
                         value={this.state.data.resposta[0].caracteristicas} 
                         onChange={this.handleChange} />
                    </div>
                </div>
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
                                    <input id="radio1" disabled={true} className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="1" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio11">1</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio2" disabled={true} className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="2" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio12">2</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio3" disabled={true} className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="3" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio13">3</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio4" disabled={true} className="form-check-input p-1" type="radio" name="inlineRadioOptions0"  value="4" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio14">4</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="radio5" disabled={true} className="form-check-input p-1" type="radio" name="inlineRadioOptions0" value="5" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio15">5</label>
                                </div>
                            </td>
                            <td>
                                <textarea readOnly id="observacoes" className="form-control input" style={{ resize: "none" }} rows="1" />
                            </td>
                        </tr>

                    </tbody>
                </table>
        {/* Botões */}
        <div id="editarF" className="row" style={{ display: "none" }}>
          <div className="col-md-12">
            <div className="col-md-x">
              <button
                type="button"
                className="btn m-1 btn-primary"
                onClick={this.adicionaNovaLinha}
              >
                Adicionar linha
              </button>
              
              <button
                type="button"
                className="btn m-1 btn-secondary"
                onClick={this.eliminaUltimaLinha}
              >
                Remover linha
              </button>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <button
              type="button"
              className="btn btn-success btn-lg btn-block mb-5"
              onClick={this.submit}
            >
              Guardar
            </button>
          </div>
        </div>
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