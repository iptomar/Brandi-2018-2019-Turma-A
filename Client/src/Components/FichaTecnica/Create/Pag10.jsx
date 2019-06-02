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
                    <h4>FONTES</h4>
                </div>


                <div className="row">
                    <div className="col-md-12 text-center">
                        <h4>Arquivísticas | Documentais</h4>
                    </div>
                </div>


                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Autor/Título/Local/Editor/Data/Página(s)</label>
                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Tipo</label>
                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Localização</label>
                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Cota</label>

                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <textarea id="atledpArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="tipoArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="localArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="cotaArqDoc" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>
                </div>
                <hr />
                <br />

                <div className="row">
                    <div className="col-md-12 text-center">
                        <h4>Iconográficas</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Autor/Título/Local/Editor/Data/Página(s)</label>


                    </div>
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Tipo</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Localização</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Cota</label>


                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <textarea id="atledpIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="tipoIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="localIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="cotaIcon" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>
                </div>
                <hr />
                <br />

                <div className="row">
                    <div className="col-md-12 text-center">
                        <h4>Bibliográficas</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Autor/Título/Local/Editor/Data/Página(s)</label>


                    </div>
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Tipo</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Localização</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Cota</label>


                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <textarea id="atledpBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="tipoBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="localBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="cotaBiblio" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>
                </div>
                <hr />
                <br />

                <div className="row">
                    <div className="col-md-12 text-center">
                        <h4>Outras Fontes</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Autor/Título/Local/Editor/Data/Página(s)</label>


                    </div>
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Tipo</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Localização</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Cota</label>


                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <textarea id="atledpOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="tipoOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="localOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="cotaOutras" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                    </div>
                </div>

                <hr />
                <br />
                <hr />
                <div className="row">
                    <table className="table table-bordered table-secondary text-center" id="table">
                        <thead >
                            <tr>
                                <th className="align-middle">
                                    <h4>CONSTITUIÇÃO DA EQUIPA</h4>
                                    Nome do Técnico
                                    </th>
                                <th className="align-middle">
                                    <h4>Funções Desempenhadas</h4>
                                </th>
                                <th className="align-middle">
                                    <h4>Habilitações</h4>
                                    (Escolares | Académicas)
                                        <h4>Nível Profissional</h4>
                                    (1-8)
                                    </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
                                <td><textarea className="form-control" type="text" style={{ resize: "none" }} rows="2"></textarea></td>
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

