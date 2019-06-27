import React, { Component } from "react";
import AlertMsg from "../../Globais/AlertMsg";
import $ from "jquery";

/**
 * Componente de Edição de uma folha de obra já existente
 */
class Edit extends Component {
  /**
   *  Contém o container AlertMsg e os dados do fetch
   */
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      data: []
    };
    this.preencheTabela = this.preencheTabela.bind(this);
    this.preencheLinha = this.preencheLinha.bind(this);
  }

  componentDidMount() {
    this.fetchDetalhes(this.props.id);
  }

  /**
   * Adiciona uma nova linha no fim da tabela da folha de obra
   */
  adicionaNovaLinha = () => {
    let linha = $("#linha").clone(this);
    linha.attr("data-id", "");
    linha.find("input").get(0).value = "";
    let textArea = linha.find("textarea");
    for (let i = 0; i < textArea.length; i++) {
      textArea.get(i).value = "";
    }
    $("tbody").append(linha);
  };

  /**
   * Elimina a última linha na tabela da folha de obra
   */
  eliminaUltimaLinha = () => {
    var table = document.getElementById("tabela");
    var numRows = table.rows.length;
    if (numRows >= 3) {
      table.deleteRow(-1);
    }
  };

  /**
   * Recebe um id e devolve os detalhes de uma Folha de Obra com esse id
   *
   */
  fetchDetalhes = async id => {
    const response = await fetch(`/api/folhaDeObra/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          this.preencheTabela();
          break;
        default:
          this.setState({
            alertText: "Erro",
            alertColor: "danger",
            alertisNotVisible: true
          });
      }
    });
  };

  preencheLinha = i => {
    document.querySelectorAll("#linha")[i].setAttribute("data-id", this.state.data[i].folhaDeObraLinhaID);
    document.querySelectorAll("#dataL")[i].value = this.state.data[i].data.substring(0, 10);
    document.querySelectorAll("#dpL")[i].value = this.state.data[i].designacaoProcedimento;
    document.querySelectorAll("#mpL")[i].value = this.state.data[i].materiais;
    document.querySelectorAll("#qL")[i].value = this.state.data[i].quantidades;
    document.querySelectorAll("#durL")[i].value = this.state.data[i].duracao;
    document.querySelectorAll("#tecnicoL")[i].value = this.state.data[i].tecnico;
    document.querySelectorAll("#obsL")[i].value = this.state.data[i].observacoes;
  };

  preencheTabela = () => {
    this.preencheLinha(0);
    for (let i = 1; i < this.state.data.length; i++) {
      this.adicionaNovaLinha();
      this.preencheLinha(i);
    }
  };

  /**
   * Verifica se a tabela está preenchida. Cria um array com os conteúdos da tabela e submete-o. Trata a resposta do servidor
   */
  submit = async e => {
    e.preventDefault();
    /* Seleciona todos os inputs da tabela */
    let inputs = document.querySelectorAll(".input");
    for (let i = 0; i < inputs.length; i++) {
      /* Se os inputs estiverem vazios */
      if (inputs[i].value === "") {
        this.setState({
          alertText:
            "Existem campos da Folha de Obra que não foram preenchidos!",
          alertisNotVisible: false,
          alertColor: "warning"
        });
        return;
      }
    }
    /* Neste momento, todos os inputs estão preenchidos */
    let tab = [];
    /* Iterar da 2.ª linha da tabela até ao fim */
    for (
      let i = 0;
      i < document.getElementById("tabela").children[1].childElementCount;
      i++
    ) {
      let content = document.getElementById("tabela").children[1].children[i];
      tab.push({
        /* Campos da tabela */
        folhaDeObraLinhaID: content.getAttribute("data-id"),
        data: content.children[0].children[0].value,
        designacaoDoProcedimento: content.children[1].children[0].value,
        materiaisProdutos: content.children[2].children[0].value,
        quantidades: content.children[3].children[0].value,
        duracao: content.children[4].children[0].value,
        tecnico: content.children[5].children[0].value,
        observacoes: content.children[6].children[0].value
      });
    }
    /* Enviar para a API */
    const response = await fetch(`/api/folhaDeObra/${this.props.id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      },
      body: JSON.stringify(tab)
    });
    /* Aguardar a resposta da API e avaliar o que fazer */
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Success":
          window.location = `/folhaDeObra/${this.props.id}/detalhes`;
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
   * Método que transforma a página dos detalhes para a página da edição
   */
  changeToEdit() {
    //Remove o atributo readonly nos input e nas textarea
    $("input, textarea").removeAttr("readonly");
    const btEditar = document.getElementById("btEditar");
    btEditar.style.display = "none";
    // Apresentar todo o conteudo que foi escondido na apresentação
    $("#editarF").show();
  }

  /**
   * Formulário de criação da folha de obra com botões de adição e remoção de linha e de criação de folha
   */
  render() {
    return (
      <div className="container mb-3">
        {/* Título */}
        <div className="row">
          <div className="col-md-10 pt-3 py-3 text-center">
            <h2>Folha de Obra</h2>
          </div>
          <div className="col-md-2">
            <button
              id="btEditar"
              className="btn btn-success my-3"
              onClick={this.changeToEdit}
            >
              Editar
            </button>
          </div>
        </div>

        {/* Tabela */}
        <table
          className="table table-bordered table-secondary text-center"
          id="tabela"
        >
          <thead>
            <tr>
              <th className="align-middle">Data</th>
              <th className="align-middle">Designação do procedimento</th>
              <th className="align-middle">Materiais e produtos</th>
              <th className="align-middle">Quantidades</th>
              <th className="align-middle">Duração</th>
              <th className="align-middle">Técnico</th>
              <th className="align-middle">Observações</th>
            </tr>
          </thead>
          <tbody>
            <tr id="linha" data-id="">
              <td>
                <input
                  id="dataL"
                  type="date"
                  className="form-control input"
                  style={{ height: "63px" }}
                  readOnly
                />
              </td>
              <td>
                <textarea
                  id="dpL"
                  className="form-control input"
                  style={{ resize: "none" }}
                  rows="2"
                  placeholder="Designação do procedimento"
                  readOnly
                />
              </td>
              <td>
                <textarea
                  id="mpL"
                  className="form-control input"
                  style={{ resize: "none" }}
                  rows="2"
                  placeholder="Materiais e produtos"
                  readOnly
                />
              </td>
              <td>
                <textarea
                  id="qL"
                  className="form-control input"
                  style={{ resize: "none" }}
                  rows="2"
                  placeholder="Quantidades"
                  readOnly
                />
              </td>
              <td>
                <textarea
                  id="durL"
                  className="form-control input"
                  style={{ resize: "none" }}
                  rows="2"
                  placeholder="HH:MM"
                  readOnly
                />
              </td>
              <td>
                <textarea
                  id="tecnicoL"
                  className="form-control input"
                  style={{ resize: "none" }}
                  rows="2"
                  placeholder="Técnico"
                  readOnly
                />
              </td>
              <td>
                <textarea
                  id="obsL"
                  className="form-control input"
                  style={{ resize: "none" }}
                  rows="2"
                  placeholder="Observações"
                  readOnly
                />
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
              <AlertMsg
                text={this.state.alertText}
                isNotVisible={this.state.alertisNotVisible}
                alertColor={this.state.alertColor}
              />
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
  }
}
export default Edit;
