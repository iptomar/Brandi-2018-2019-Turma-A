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
                <input type="text" className="form-control mb-3" id="localizacao" placeholder="Localização da obra" required />
                <hr />

                <label>Características: </label>
                <input type="text" className="form-control mb-3" id="localizacao" placeholder="Localização da obra" required />
                <hr />

                {/* Tabela */}
                <table>
                    <thead>
                        <tr>
                            <th className="align-middle">Solvente ou Mistura de Solventes</th>
                            <th className="align-middle">Grau de Eficácia Na Solubilização
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
                            </th>
                            <th className="align-middle">Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="HH:MM"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Técnico"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Observações"/></td>
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