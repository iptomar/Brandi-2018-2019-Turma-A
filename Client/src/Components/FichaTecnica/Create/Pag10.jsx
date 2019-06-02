import React, { Component } from "react";

class Pag10 extends Component {

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
        var table = document.getElementById("table");
        var numRows = table.rows.length;
        if (numRows > 2) {
            table.deleteRow(-1);
        }
    }

    adicionaNovaLinha = () => {
        var table = document.getElementById("table");
        //inserir nova linha
        var row = table.insertRow(-1);
        //parametros textArea
        for (var i = 0; i < 3; i++) {
            var novaCelula = row.insertCell(i);
            var param = document.createElement('textarea');
            param.className = "form-control";
            param.setAttribute("type", "text");
            param.style.resize = "none";
            param.setAttribute("rows", "2");
            novaCelula.appendChild(param);
        }

    }



    render() {
        return (
            <div className="container" style={{ paddingTop: "0px" }}>
                <div className="pt-3 py-3 text-center">
                    <h4>Fontes</h4>
                </div>

                <div className="row text-center mb-4">
                    <div className="col-md-12 mb-2">
                        <h5>Arquivísticas / Documentais:</h5>
                    </div>
                    <div className="col-md-6">
                        <label className="align-middle">Autor / Título / Local / Editor / Data / Página:</label>
                        <textarea id="atledpArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Autor / Título / Local / Editor / Data / Página" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Tipo:</label>
                        <textarea id="tipoArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Tipo" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Localização:</label>
                        <textarea id="localArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Localização" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Cota:</label>
                        <textarea id="cotaArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Cota" />
                    </div>
                </div>

                <div className="row text-center mb-4">
                    <div className="col-md-12 mb-2">
                        <h5>Iconográficas:</h5>
                    </div>
                    <div className="col-md-6">
                        <label className="align-middle">Autor / Título / Local / Editor / Data / Página:</label>
                        <textarea id="atledpIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Autor / Título / Local / Editor / Data / Página" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Tipo:</label>
                        <textarea id="tipoIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Tipo" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Localização:</label>
                        <textarea id="localIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Localização" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Cota:</label>
                        <textarea id="cotaIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Cota" />
                    </div>
                </div>

                <div className="row text-center mb-4">
                    <div className="col-md-12 mb-2">
                        <h5>Bibliográficas:</h5>
                    </div>
                    <div className="col-md-6">
                        <label className="align-middle">Autor / Título / Local / Editor / Data / Página:</label>
                        <textarea id="atledpBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Autor / Título / Local / Editor / Data / Página" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Tipo:</label>
                        <textarea id="tipoBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Tipo" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Localização:</label>
                        <textarea id="localBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Localização" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Cota:</label>
                        <textarea id="cotaBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Cota" />
                    </div>
                </div>

                <div className="row text-center mb-5">
                    <div className="col-md-12 text-center">
                        <h5>Outras Fontes:</h5>
                    </div>
                    <div className="col-md-6">
                        <label className="align-middle">Autor / Título / Local / Editor / Data / Página:</label>
                        <textarea id="atledpOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Autor / Título / Local / Editor / Data / Página" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Tipo:</label>
                        <textarea id="tipoOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Tipo" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Localização:</label>
                        <textarea id="localOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Localização" />
                    </div>
                    <div className="col-md-2">
                        <label className="align-middle">Cota:</label>
                        <textarea id="cotaOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="Cota" />
                    </div>
                </div>

                <div className="row">
                    <table className="table table-bordered table-secondary text-center" id="table">
                        <thead >
                            <tr>
                                <th className="align-middle">Constituição da Equipa / Nome do Técnico</th>
                                <th className="align-middle">Funções Desempenhadas</th>
                                <th className="align-middle">Habilitações Escolares / Nível Profissional (1-8)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Constituição da Equipa / Nome do Técnico"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Funções Desempenhadas"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2" placeholder="Habilitações Escolares / Nível Profissional (1-8)"></textarea></td>
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
            </div>
        );
    }
}
export default Pag10;

