import React, { Component } from "react";

class Pag8 extends Component {

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
                        <h4>Intervenção Realizada</h4>
                    </div>
                    <div className="row">
                        {/* ESTRUTURA */}
                        <div className="col-md-6 mb-3">
                            <label>Estrutura:</label>
                            <textarea type="text" id="estruturaPag8" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Estrutura" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Recursos: (Materiais | Técnicos | Tecnológicos)</label>
                            <textarea type="text" id="recursosEstruturaPag8" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Recursos" />
                        </div>
                        {/* SUPERFICIE */}
                        <div className="col-md-6 mb-3">
                            <label>Superfície:</label>
                            <textarea type="text" id="superficiePag8" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Superficie" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Recursos: (Materiais | Técnicos | Tecnológicos)</label>
                            <textarea type="text" id="recursosSuperficiePag8" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Recursos" />
                        </div>
                        {/* ELEMENTOS ACESSÓRIOS */}
                        <div className="col-md-6 mb-3">
                            <label>Elementos Acessórios:</label>
                            <textarea type="text" id="elementosAcessoriosPag8" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Superficie" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Recursos: (Materiais | Técnicos | Tecnológicos)</label>
                            <textarea type="text" id="recursosElementosAcPag8" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Recursos" />
                        </div>
                    </div>
                    {/* OBSERVAÇÕES E CONCLUSÕES */}
                    <div className="pt-3 py-3 text-center">
                        <h5>Observações / Conclusões:</h5>
                    </div>
                    <textarea id="observaçoesConclusoesPag8" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                    <br />

                </div>

            </div>
        );
    }
}
export default Pag8;

