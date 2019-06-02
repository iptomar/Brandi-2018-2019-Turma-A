import React, { Component } from "react";

class Pag5 extends Component {

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
            <div className="container" style={{ paddingTop: "0px" }}>
                <div className="pt-3 py-3 text-center">
                    <h4>Estado de Conservação</h4>
                </div>

                <div className="pt-3 py-3 text-center">
                    <h5>Deterioração Fisica, Quimica e Mecânica dos Materiais:</h5>
                    <small>Alterabilidade: decorrente de envelhecimento natural  |
                        Alteração: decorrente de fatores físicos, químicos, biológicos e antrópicos
                        </small>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Estrutura</label>


                    </div>
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Superfície</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Elementos Acessórios</label>


                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <textarea id="estruturaPag5" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />


                    </div>
                    <div className="col d-flex justify-content-center">
                        <textarea id="superficiePag5" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="elementosAcessoriosPag5" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />


                    </div>
                </div>
                <hr></hr>
                <div className="pt-3 py-3 text-center">
                    <h5>Deterioração Biológica dos Materiais:</h5>
                    <small>Identificação de Patologias e Agentes de Biodeterioração – Diagnóstico
                        </small>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Estrutura</label>


                    </div>
                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Superfície</label>


                    </div>

                    <div className="col d-flex justify-content-center">
                        <label className="align-middle">Elementos Acessórios</label>


                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <textarea id="estruturaPag5diag" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />


                    </div>
                    <div className="col d-flex justify-content-center">
                        <textarea id="superficiePag5diag" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />


                    </div>

                    <div className="col d-flex justify-content-center">
                        <textarea id="elementosAcessoriosPag5diag" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />


                    </div>
                </div>
                <hr></hr>
                <div className="pt-3 py-3 text-center">
                    <h5>Observações / Conclusões:</h5>
                </div>
                <textarea id="observaçoesConclusoesPag5" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />

            </div>
        );
    }
}
export default Pag5;

