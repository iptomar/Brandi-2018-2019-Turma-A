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
        novaCelula.appendChild(param);
        // Coluna 2
        param = document.createElement('input');
        novaCelula = row.insertCell(1);
        param.setAttribute('type', 'radio');
        param.className = "EficaciaOptions";
        novaCelula.appendChild(param);
        // Coluna 3
        novaCelula = row.insertCell(2);
        param = document.createElement('textarea');
        param.className = "form-control input";
        param.style.resize = "none";
        param.setAttribute("rows", "1");
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
                    <h2>TESTE DE EFICÁCIA DOS SOLVENTES NA LIMPEZA E SOLUBILIZAÇÃO DE ESTRATOS E SUJIDADES</h2>
                </div>
                <hr />

                <label>Identificação do Estrato/Sujidade: </label>
                <input type="text" className="form-control mb-3" id="idEstratoSujidade" placeholder="Localização da obra" required />
                <hr />

                <label>Características: </label>
                <input type="text" className="form-control mb-3" id="caracteristicas" placeholder="Localização da obra" required />
                <hr />

                {/* Tabela */}
                <table className="table table-bordered table-secondary text-center" id="table">
                    <thead>
                        <tr>
                            <th className="align-middle">Solvente ou Mistura de Solventes</th>
                            <th className="align-middle">Grau de Eficácia Na Solubilização                            </th>
                            <th className="align-middle">Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="1" /></td>
                            <td>                            
                                <div className="row text-center">
                                    {/* RADIO BUTTONS */}
                                    <div className="input-group mb-3 col-md-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name="EficaciaOptions" id="um" value="1" />
                                            </div>
                                        </div>
                                        <label className="form-control" htmlFor="EficaciaUm">1</label>
                                    </div>

                                    <div className="input-group mb-3 col-md-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name="EficaciaOptions" id="dois" value="2" />
                                            </div>
                                        </div>
                                        <label className="form-control" htmlFor="EficaciaDois">2</label>
                                    </div>

                                    <div className="input-group mb-3 col-md-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name="EficaciaOptions" id="tres" value="3" />
                                            </div>
                                        </div>
                                        <label className="form-control" htmlFor="EficaciaTres">3</label>
                                    </div>

                                    <div className="input-group mb-3 col-md-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name="EficaciaOptions" id="quatro" value="4" />
                                            </div>
                                        </div>
                                        <label className="form-control" htmlFor="EficaciaQuatro">4</label>
                                    </div>

                                    <div className="input-group mb-3 col-md-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name="EficaciaOptions" id="cinco" value="5" />
                                            </div>
                                        </div>
                                        <label className="form-control" htmlFor="EficaciaCinco">5</label>
                                    </div>
                                </div>
                            </td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="1" /></td>
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