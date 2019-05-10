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
    adicionaNovaLinha = () => {
        var table = document.getElementById("tabela");
        //inserir nova linha
        var row = table.insertRow(-1);
        //parametros textArea
        for (var i = 0; i < 4; i++) {
            var novaCelula = row.insertCell(i);
            var param = document.createElement('textarea');
            param.setAttribute("rows", "2");
            param.style.resize="none";
            novaCelula.appendChild(param);
        }
        //parametro input
        //técnico
        var cellTecnico = row.insertCell(4);
        var paramTecnico = document.createElement('textarea');
        paramTecnico.setAttribute("type", "text")
        paramTecnico.readOnly = true;
        paramTecnico.setAttribute("rows", "2");
        paramTecnico.style.resize = "none";
        paramTecnico.value = "Name";
        cellTecnico.appendChild(paramTecnico);
        //parametro date
        //data
        var cellDate = row.insertCell(5);
        var paramData = document.createElement('input');
        paramData.setAttribute("type", "date")
        cellDate.appendChild(paramData);
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
                            <label className="form-control" htmlFor="identMateriais">Identificação de materiais, técnicas e tecnologias de produção</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="identIntervencoes" value="identIntervencoes" />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="identIntervencoes">Identificação de intervenções efectuadas no objecto</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="caracterizacao" value="caracterizacao" />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="caracterizacao">Caraterização do estado de conservação </label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="identPatologias" value="identPatologias" />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="identPatologias">Identificação de patologias e agentes de biodeterioração</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="datacao" value="datacao" />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="datacao">Datação do objecto e das eventuais intervenções que tenha sido alvo</label>
                        </div>
                        <div className="input-group mb-3 col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="checkbox" name="objetivosGerais" id="ensaio" value="ensaio" />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="ensaio">Ensaio de produtos e materiais a empregar na intervenção</label>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <table className="table table-bordered table-secondary text-center" id="tabela">
                            <thead >
                                <tr>
                                    <th className="align-middle">Tipo-Referência</th>
                                    <th className="align-middle">Localização / Área / Ponto</th>
                                    <th className="align-middle">Objetivos Específicos</th>
                                    <th className="align-middle">Resultados</th>
                                    <th className="align-middle">Técnico</th>
                                    <th className="align-middle">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
                                    <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
                                    <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
                                    <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
                                    <td><textarea className="form-control" type="text" readOnly value="Name" style={{ resize: "none" }} rows="2"></textarea></td>
                                    <td><input className="form-control" type="date"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="btn btn-dark" onClick={this.adicionaNovaLinha}>Adicionar Linha</button>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label>Interpretação dos Resultados:</label>
                            <textarea type="text" id="interpretacaoResul" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Interpretação dos Resultados" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label>Observações / Conclusões:</label>
                            <textarea type="text" id="observaConclusoes" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Observações / Conclusões" />
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}
export default Pag4;

