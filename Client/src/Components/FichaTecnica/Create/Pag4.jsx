import React, { Component } from "react";

class Pag4 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            alertText: '',
            alertisNotVisible: true,
            alertColor: '',
        };
    }
    //função que adiciona nova linha para a tabela 
    adicionaLinha() {

    }



    render() {
        return (
            <div className="Inicio container">
                <div className="container">


                    <div className="pt-3 py-3 text-center">
                        <h4>Exames e Análises</h4>
                    </div>

                    <label>Objectivo (s) Geral (ais):</label>
                    <div className="row">
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="identMateriais" value="identMateriais" />
                                </div>
                            </div>
                            <label className="form-control" for="identMateriais">Identificação de materiais, técnicas e tecnologias de produção</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="identIntervencoes" value="identIntervencoes" />
                                </div>
                            </div>
                            <label className="form-control" for="identIntervencoes">Identificação de intervenções efectuadas no objecto</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="caracterizacao" value="caracterizacao" />
                                </div>
                            </div>
                            <label className="form-control" for="caracterizacao">Caraterização do estado de conservação </label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="identPatologias" value="identPatologias" />
                                </div>
                            </div>
                            <label className="form-control" for="identPatologias">Identificação de patologias e agentes de biodeterioração</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="datacao" value="datacao" />
                                </div>
                            </div>
                            <label className="form-control" for="datacao">Datação do objecto e das eventuais intervenções que tenha sido alvo</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="ensaio" value="ensaio" />
                                </div>
                            </div>
                            <label className="form-control" for="ensaio">Ensaio de produtos e materiais a empregar na intervenção</label>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="input-group mr-3 col-md-3">

                            <table className="table table-bordered table-secondary">
                                <thead >
                                    <tr>
                                        <th scope="col">Tipo-Referência</th>
                                        <th>Localização, Área, Ponto</th>
                                        <th>Objetivos Específicos</th>
                                        <th>Resultados</th>
                                        <th>Técnico</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><textarea type="text"></textarea></td>
                                        <td><textarea type = "text"></textarea></td>
                                        <td><textarea type = "text"></textarea></td>
                                        <td><textarea type = "text"></textarea></td>
                                        <td><input type="text" readOnly value="Name"></input></td>
                                        <td><input type = "date"></input></td>
                                        
                                    </tr>                    
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}
export default Pag4;

