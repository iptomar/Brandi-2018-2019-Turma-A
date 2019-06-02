import React, { Component } from "react";

class Pag2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            alertText: '',
            alertisNotVisible: true,
            alertColor: ''
        };
    }

    render() {
        return (
            <div className="container" style={{ paddingTop: "0px" }}>
                <div className="row">
                    <div className="col-md-12 order-md-1">
                        <label>Bem Integrado em Conjunto:</label>
                        <div className="row text-center">
                            {/* RADIO BUTTONS */}
                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="bemIntegradoOptions" id="bemIntegradoSim" value="Sim" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="bemIntegradoSim">Sim</label>
                            </div>
                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="bemIntegradoOptions" id="bemIntegradoNão" value="Não" defaultChecked />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="bemIntegradoNão">Não</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label>Tipo de Conjunto / Bens do Conjunto:</label>
                                <input type="text" className="form-control" id="tipoConjunto" placeholder="Tipo de Conjunto / Bens do Conjunto" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Elementos Constituintes do Bem Cultural:</label>
                                <input type="text" className="form-control" id="elementosConst" placeholder="Elementos Constituintes do Bem Cultural" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Materiais / Elementos Acessórios:</label>
                                <input type="text" className="form-control" id="elementosAcess" placeholder="Materiais / Elementos Acessórios" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Marcas / Inscrições / Assinaturas de Autoria:</label>
                                <input type="text" className="form-control" id="assinaturasAutoria" placeholder="Marcas / Inscrições / Assinaturas de Autoria" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Marcas / Inscrições de Montagem de Elementos:</label>
                                <input type="text" className="form-control" id="inscricoesMontagem" placeholder="Marcas / Inscrições de Montagem de Elementos" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Marcas / Inscrições de Construção:</label>
                                <input type="text" className="form-control" id="inscricoesConstrucao" placeholder="Marcas / Inscrições de Construção:" required />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Classificação Patrimonial:</label>
                                <input type="text" className="form-control" id="classPatrimonial" placeholder="Classificação Patrimonial" required />
                            </div>

                        </div>
                        <label>Época:</label>
                        <div className="row">
                            {/* RADIO BUTTONS */}
                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="EpocaOptions" id="EpocaCoevo" value="Coevo" defaultChecked />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="EpocaCoevo">Coevo</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="EpocaOptions" id="EpocaTardio" value="Tardio" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="EpocaTardio">Tardio</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="EpocaOptions" id="EpocaOutra" value="Outra época" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="EpocaOutra">Outra época</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="EpocaOptions" id="EpocaReplica" value="Réplica" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="EpocaReplica">Réplica</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="EpocaOptions" id="EpocaReproducao" value="Reprodução" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="EpocaReproducao">Reprodução</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="EpocaOptions" id="EpocaFalsificacao" value="Falsificação" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="EpocaFalsificacao">Falsificação</label>
                            </div>

                        </div>
                        <hr />
                        <label>Qualidade:</label>
                        <div className="row text-center">

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="QualidadeOptions" id="QualidadeExcelente" value="Excelente" defaultChecked />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="QualidadeExcelente">Excelente</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="QualidadeOptions" id="QualidadeMuitoBoa" value="Muito boa" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="QualidadeMuitoBoa">Muito boa</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="QualidadeOptions" id="QualidadeBoa" value="Boa" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="QualidadeBoa">Boa</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="QualidadeOptions" id="QualidadeRegular" value="Regular" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="QualidadeRegular">Regular</label>
                            </div>

                            <div className="input-group mb-3 col-md-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="radio" name="QualidadeOptions" id="QualidadeFraca" value="Fraca" />
                                    </div>
                                </div>
                                <label className="form-control" htmlFor="QualidadeFraca">Fraca</label>
                            </div>
                        </div>

                        <hr />

                        <div className="row">
                            {/* MATERIAIS */}
                            <div className="col-md-12 text-center">
                                <h4>Materiais</h4>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Estrutura / Suporte:</label>
                                <textarea type="text" id="estruturaSuporteMateriais" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Estrutura / Suporte" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Superfície:</label>
                                <textarea type="text" id="SuperficieMateriais" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Superfície" />
                            </div>

                            {/* TÉCNICAS */}
                            <div className="col-md-12 text-center">
                                <h4>Técnicas</h4>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Estrutura / Suporte:</label>
                                <textarea type="text" id="estruturaSuporteTecnicas" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Estrutura / Suporte" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Superfície:</label>
                                <textarea type="text" id="SuperficieTecnicas" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Superfície" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Pag2;

