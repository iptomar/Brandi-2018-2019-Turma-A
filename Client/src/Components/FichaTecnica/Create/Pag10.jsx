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


    render() {
        return (
                <div className="container" style={{paddingTop:"0px"}}>
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
                            <label className="align-middle">Autor/Título/Local/Editor/Data/Página (s)</label>


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
                </div>
        );
    }
}
export default Pag10;

