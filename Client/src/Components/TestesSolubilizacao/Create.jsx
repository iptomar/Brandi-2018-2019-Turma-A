import React, { Component } from "react";
import AlertMsg from "../Globais/AlertMsg";

/**
 * Componente de criação de um novo de Teste de Solubilização
 */

class Create extends Component {

    /**
    *  Contém apenas o container AlertMsg no this.state 
    */
    constructor(props) {
        super(props);
        this.state = {
            alertText: '',
            alertisNotVisible: true,
            alertColor: '',
        };
    }

    eliminaUltimaLinha = () => {
        var table = document.getElementById("table");
        var numRows = table.rows.length;
        if (numRows > 2) {
            table.deleteRow(-1);
        }
    }

    adicionaNovaLinha = () => {
        var table = document.getElementById('table');
        var row = table.insertRow(-1);
        var novaCelula = row.insertCell(0);
        // Coluna 1
        var param = document.createElement('input');
        novaCelula = row.insertCell(0);
        param = document.createElement('textarea');
        param.className = "form-control input";
        param.style.resize = "none";
        param.setAttribute("rows", "1");
        param.placeholder = "Solvente ou mistura de solventes";
        novaCelula.appendChild(param);
        // Coluna 2         
        var div = document.createElement('div');
        div.className = "form-check form-check-inline pt-1";
        novaCelula = row.insertCell(1);
        for (let i = 1; i <= 5; i++) {
            // Input
            param = document.createElement("input");
            param.className = "form-check-input";
            param.setAttribute("type", "radio");
            div.appendChild(param);
            // Label
            param = document.createElement("label");
            param.className = "form-check-label";
            param.value=i;
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
    * Formulário de criação do teste de solubilização
    */
    render() {
        return (
            <div className="container mb-3">
                {/* Título */}
                <div className="pt-3 py-3 text-center">
                    <h2>Teste de Solventes </h2>
                    <h5>Teste de eficácia dos solventes na limpeza e solubilização de estratos e sujidades</h5>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Identificação do Estrato / Sujidade: </label>
                        <input type="text" className="form-control mb-3" id="idEstratoSujidade" placeholder="Identificação do Estrato / Sujidade" required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label>Características: </label>
                        <input type="text" className="form-control mb-3" id="caracteristicas" placeholder="Características" required />
                    </div>
                </div>

                {/* Tabela */}
                <table className="table table-bordered table-secondary text-center" id="table">
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
                                <div className="form-check form-check-inline pt-1">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio11" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio11">1</label>
                                </div>

                                <div className="form-check form-check-inline pt-1">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio12" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio12">2</label>
                                </div>

                                <div className="form-check form-check-inline pt-1">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio13" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio13">3</label>
                                </div>

                                <div className="form-check form-check-inline pt-1">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio14" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio14">4</label>
                                </div>

                                <div className="form-check form-check-inline pt-1">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio15" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio15">5</label>
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
                </div>
            </div>
        );
    }

}
export default Create;