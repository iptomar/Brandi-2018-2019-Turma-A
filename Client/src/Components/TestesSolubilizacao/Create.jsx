import React, { Component } from "react";
import AlertMsg from "../Globais/AlertMsg";

/**
 * Componente de criação de um novo de Teste de Solubilização
 */

class Create extends Component {

    /**
    *  Contém apenas os atributos do container AlertMsg no this.state 
    */
    constructor(props) {
        super(props);
        this.state = {
            alertText: '',
            alertisNotVisible: true,
            alertColor: '',
            id: this.props.id,
        };
    }

    /**
     * Adiciona uma nova linha no fim da tabela da folha de obra
     */
    adicionaNovaLinha = () => {
        var table = document.getElementById('tabela');
        var row = table.insertRow(-1);
        var novaCelula = row.insertCell(0);
        // Coluna 1
        var param = document.createElement('input');
        param = document.createElement('textarea');
        param.className = "form-control input";
        param.style.resize = "none";
        param.setAttribute("rows", "1");
        param.placeholder = "Solvente ou mistura de solventes";
        novaCelula.appendChild(param);
        // Coluna 2      
        // Quantas linhas tem a tabela?
        var linhas = table.rows.length - 1;
        var div = null;
        novaCelula = row.insertCell(1);
        for (let i = 1; i <= 5; i++) {
            // Div
            div = document.createElement('div');
            div.className = "form-check form-check-inline";
            // Input
            param = document.createElement("input");
            if (i === 1) {
                param.defaultChecked = "true";
            }
            param.className = "form-check-input p-1 input";
            param.setAttribute("type", "radio");
            param.name = "inlineRadioOptions" + linhas;
            param.id = "inlineRadio" + linhas + i;
            param.value = i + "";
            // Pendurar o input no div
            div.appendChild(param);
            // Label
            param = null;
            param = document.createElement("label");
            param.className = "form-check-label p-1";
            param.htmlFor = "inlineRadio" + linhas + i;
            param.innerHTML = i;
            // Pendurar a label no div
            div.appendChild(param);
            novaCelula.appendChild(div);
        }
        // Coluna 3
        novaCelula = row.insertCell(2);
        param = document.createElement('textarea');
        param.className = "form-control input";
        param.style.resize = "none";
        param.setAttribute("rows", "1");
        param.placeholder = "Observações";
        novaCelula.appendChild(param);
    }

    /**
     * Elimina a última linha na tabela dos testes de solubilidade
     */
    eliminaUltimaLinha = () => {
        var table = document.getElementById("tabela");
        var numRows = table.rows.length;
        if (numRows > 2) {
            table.deleteRow(-1);
        }
    }

    /**
     * Verifica se a tabela está preenchida. Cria um array com os conteúdos do formulário. 
     * Trata a resposta do servidor
     */
    submit = async e => {
        e.preventDefault();
        var inputs = document.querySelectorAll(".input");
        // Verificação de se todos os inputs estão preenchidos
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                this.setState({
                    alertText: "Existem campos dos Testes de Solventes que não foram preenchidos!",
                    alertisNotVisible: false,
                    alertColor: "warning"
                });
                return;
            }
        }
        // Criação do form
        let tab = [];
        tab.push(
            {
                "idEstratoSujidade": document.querySelector("#idEstratoSujidade").value,
                "caracteristicas": document.querySelector("#caracteristicas").value,
            }
        );
        for (let i = 0; i < document.querySelector("#tabela").children[1].childElementCount; i++) {
            let content = document.getElementById("tabela").children[1].children[i];
            tab.push(
                {
                    "solvente": content.children[0].children[0].value,
                    "grauDeEficacia": document.querySelector('input[name=inlineRadioOptions' + (i + 1) + ']:checked').value,
                    "observacoes": content.children[2].children[0].value
                }
            )
        }
        /* Enviar para a API */
        const response = await fetch("/api/testesSolubilizacao/"+this.state.id+"/criar", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "x-auth-token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(tab)
        });
        /* Aguardar a resposta da API e avaliar o que fazer */
        await response.json().then(resp => {
            let status = resp.status;
            switch (status) {
                case "Success":
                    window.location = "/testesSolubilizacao"
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
    }

    /**
    * Formulário de criação do teste de solubilização
    */
    render() {
        return (
            <div className="container mb-3">
                {/* Título */}
                <div className="pt-3 py-3 text-center">
                    <h2>Testes de Solventes</h2>
                    <h5>Teste de eficácia dos solventes na limpeza e solubilização de estratos e sujidades</h5>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Identificação do Estrato / Sujidade</label>
                        <input type="text" className="form-control mb-3 input" id="idEstratoSujidade" placeholder="Identificação do Estrato / Sujidade" required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label>Características</label>
                        <input type="text" className="form-control mb-3 input" id="caracteristicas" placeholder="Características" required />
                    </div>
                </div>

                {/* Tabela */}
                <table className="table table-bordered table-secondary text-center" id="tabela">
                    <thead>
                        <tr>
                            <th className="align-middle">Solvente ou mistura de solventes</th>
                            <th className="align-middle">Grau de eficácia na solubilização</th>
                            <th className="align-middle">Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <textarea className="form-control input" style={{ resize: "none" }} rows="1" placeholder="Solvente ou mistura de solventes" />
                            </td>
                            <td>
                                {/* RADIO BUTTONS */}
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input p-1" type="radio" name="inlineRadioOptions1" id="inlineRadio11" value="1" defaultChecked />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio11">1</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input p-1" type="radio" name="inlineRadioOptions1" id="inlineRadio12" value="2" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio12">2</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input p-1" type="radio" name="inlineRadioOptions1" id="inlineRadio13" value="3" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio13">3</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input p-1" type="radio" name="inlineRadioOptions1" id="inlineRadio14" value="4" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio14">4</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input p-1" type="radio" name="inlineRadioOptions1" id="inlineRadio15" value="5" />
                                    <label className="form-check-label p-1" htmlFor="inlineRadio15">5</label>
                                </div>
                            </td>
                            <td>
                                <textarea className="form-control input" style={{ resize: "none" }} rows="1" placeholder="Observações" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/*botões*/}
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-x">
                            <button type="button" className="btn m-1 btn-primary" onClick={this.adicionaNovaLinha}>Adicionar linha</button>
                            <button type="button" className="btn m-1 btn-secondary" onClick={this.eliminaUltimaLinha}>Remover linha</button>
                            <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
                        </div>
                    </div>
                    <div className="col-md-12 mt-2">
                        <button type="button" className="btn btn-success btn-lg btn-block mb-5" onClick={this.submit}>Criar</button>
                    </div>
                </div>
            </div>
        );
    }

}
export default Create;