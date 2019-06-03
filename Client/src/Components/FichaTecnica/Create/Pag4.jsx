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

    eliminaUltimaLinha = () => {
        var table = document.getElementById("tabela");
        var numRows = table.rows.length;
        if (numRows > 2) {
            table.deleteRow(-1);
        }
    }

    adicionaNovaLinha = () => {
        var table = document.getElementById("tabela");
        //inserir nova linha
        var row = table.insertRow(-1);
        //parametros textArea
        for (var i = 0; i < 4; i++) {
            var novaCelula = row.insertCell(i);
            var param = document.createElement('textarea');
            param.className = "form-control";
            param.setAttribute("type", "text");
            param.style.resize = "none";
            param.setAttribute("rows", "2");
            novaCelula.appendChild(param);
        }

        //parametro input
        //técnico
        var cellTecnico = row.insertCell(4);
        var paramTecnico = document.createElement('textarea');
        paramTecnico.className = "form-control";
        paramTecnico.setAttribute("type", "text")
        paramTecnico.readOnly = true;
        paramTecnico.value = "Name";
        paramTecnico.style.resize = "none";
        paramTecnico.setAttribute("rows", "2");

        cellTecnico.appendChild(paramTecnico);

        //parametro date
        //data
        var cellDate = row.insertCell(5);
        var paramData = document.createElement('input');
        paramData.className = "form-control text-center";
        paramData.style.width = "170px";
        paramData.style.height = "63px"
        paramData.setAttribute("type", "date")

        cellDate.appendChild(paramData);

    }




    render() {
        return (
            <div className="container" style={{ paddingTop: "0px" }}>
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
                <hr />
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
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Tipo-Referência"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Localização / Área / Ponto"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Objetivos Específicos"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Resultados"></textarea></td>
                                <td><textarea className="form-control" type="text" readOnly value="Técnico" style={{ resize: "none" }} rows="2"></textarea></td>
                                <td><input className="form-control" style={{ width: "170px", height: "63px" }} type="date"></input></td>
                            </tr>
                        </tbody>
                    </table>
                    {/*botões*/}

                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" className="btn btn-dark" onClick={this.adicionaNovaLinha}>Adicionar Linha</button>
                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            <button type="button" className="btn btn-dark" onClick={this.eliminaUltimaLinha}>Eliminar Linha</button>
                        </div>
                    </div>

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
        );
    }
}
export default Pag4;

