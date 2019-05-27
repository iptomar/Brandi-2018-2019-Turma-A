import React, { Component } from "react";

class Pag9 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            alertText: '',
            alertisNotVisible: true,
            alertColor: '',
        };
    }


    render() {
        return (
            <div className="Inicio container">
                <div className="container">
                    <div className="pt-3 py-3 text-center">
                        <h4>Documentação produzida / recolhida</h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label>Relatório Técnico da Intervenção do LCRM:</label>
                            <input type="text" className="form-control" id="relTecInterLCRM" placeholder="Ref.ª de Arquivo:" required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>Originais Fotográficos</h4>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Tipo / Designação</label>


                        </div>
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Referências</label>


                        </div>

                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Entidade / Autor</label>


                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <textarea id="tipoDesigOrig" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="refOrig" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="entidadeOrig" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />


                        </div>
                    </div>
                    <hr />
                    <br/>

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>Documentação Gráfica (Desenhos / Mapeamentos / Gráficos / Tabelas / Quadros)</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Tipo / Designação</label>
                        </div>

                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Referências</label>
                        </div>

                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Entidade / Autor</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <textarea id="tipoDesigDocGraf" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="refDocGraf" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="entidadeDocGraf" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <hr />
                    <br/>

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>Exames e Análises</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Tipo / Designação</label>
                        </div>

                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Referências</label>
                        </div>

                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Entidade / Autor</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <textarea id="tipoDesigExames" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="refExames" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="entidadeExames" type="text" style={{ resize: "none" }} rows="4" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <hr />


                </div>

            </div>
        );
    }
}
export default Pag9;

