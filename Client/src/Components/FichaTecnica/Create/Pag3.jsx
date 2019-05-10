import React, { Component } from "react";
// import FileUpload from "../../Globais/FileUpload";
// import AlertMsg from "../../Globais/AlertMsg";

class Pag3 extends Component {

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
                        <h4>Condições ambientais do local de inserção do bem cultural</h4>
                    </div>

                    <div className="row">
                        <div className="col-6 col-md-4">
                            <div>
                                <label className="mb-3">Descrição:</label>
                                <textarea type="text" style={{ resize: "none" }} rows="6" className="form-control" placeholder="Descrição" />
                            </div>
                        </div>
                        <div className="col-12 col-md-8">
                                <div className="row text-center mb-3">
                                    <div className="col-6 col-md-4"></div>
                                    <div className="col-6 col-md-4">Frio / Húmido</div>
                                    <div className="col-6 col-md-4">Quente / Seco</div>
                                </div>
                                <div className="row text-right mb-3">
                                    <div className="col-6 col-md-4">
                                        <label>Temperatura (ºC):</label>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input className="form-control" type="number" onchange={this.handlechange} placeholder="Temperatura" />
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input className="form-control" type="number" placeholder="Temperatura" />
                                    </div>
                                </div>
                                <div className="row text-right mb-3">
                                    <div className="col-6 col-md-4">
                                        <label>Humidade relativa (%):</label>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input className="form-control" type="number" min="0" max="100" placeholder="Humidade relativa" />
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <input className="form-control" type="number" min="0" max="100" placeholder="Humidade relativa" />
                                    </div>
                                </div>
                                <div className="row text-right mb-4">
                                    <div className="col-6 col-md-4">
                                        <label>Período do ano (Meses):</label>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <input type="number" min="1" max="12" className="form-control" placeholder="Início" />
                                            </div>
                                            <div className="col-md-6 pl-1">
                                                <input type="number" min="1" max="12" className="form-control" placeholder="Fim" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <input type="number" min="1" max="12" className="form-control" placeholder="Início" />
                                            </div>
                                            <div className="col-md-6 pl-1">
                                                <input type="number" min="1" max="12" className="form-control" placeholder="Fim" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    </div>

                    <div className="pt-3 py-3 text-center">
                        <h4>Iluminação</h4>
                    </div>

                    <div className="row">
                        <div className="col text-center py-2 ">
                            <h5>Artificial</h5>
                        </div>
                        <div className="col text-center py-2" >
                            <h5>Natural </h5>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-2 text-right">
                            <label>Tipo: </label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Tipo" />
                        </div>
                        <div className="col-md-2 text-right">
                            <label>Origem: </label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Origem" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-2 text-right">
                            <label>Valor de Iluminância (lux):</label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Valor de Iluminância" />
                        </div>
                        <div className="col-md-2 text-right">
                            <label>Valor de Iluminância (lux):</label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Valor de Iluminância" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-2 text-right">
                            <label>Valor de U.V. medidos (nw/cm<sup>2</sup>):</label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Valor de U.V. medidos" />
                        </div>
                        <div className="col-md-2 text-right">
                            <label>Valor de U.V medidos (nw/cm<sup>2</sup>):</label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Valor de U.V. medidos" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-2 text-right">
                            <label>Valor real de U.V (nw/cm<sup>2</sup>):</label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Valor real de U.V (nw/cm2)" />
                        </div>
                        <div className="col-md-2 text-right">
                            <label>Valor real de U.V (nw/cm<sup>2</sup>): </label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Valor real de U.V (nw/cm2)" />
                        </div>
                    </div>

                    <div className="pt-3 py-3 text-center">
                        <h4>Poluição</h4>
                    </div>

                    <div className="row mb-3">
                        <div className="col-2 text-right">
                            <label>Agentes Poluidores:</label>
                        </div>
                        <div className="col">
                            <textarea type="text" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Agentes poluidores" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-2 text-right">
                            <label>Fontes / Origem: </label>
                        </div>
                        <div className="col">
                            <textarea type="text" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Fontes / Origem" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-2 text-right">
                            <label>Resultados: </label>
                        </div>
                        <div className="col">
                            <textarea type="text" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Resultados" />
                        </div>
                    </div>

                    <div className="pt-3 py-3 text-center">
                        <h4>Observações / Conclusões</h4>
                    </div>

                    <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="Observações / Conclusões" />
                </div>
            </div>
        );
    }
}
export default Pag3;
