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
            <div className="Inicio container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 order-md-1">
                            <label>Bem Integrado em Conjunto:</label>
                            <div className="row text-center">
                                {/* RADIO BUTTONS */}
                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="bemIntegradoOptions" id="bemIntegradoSim" value="Sim"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="bemIntegradoSim">Sim</label>
                                </div>
                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="bemIntegradoOptions" id="bemIntegradoNão" value="Não"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="bemIntegradoNão">Não</label>
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
                                            <input type="radio" name="EpocaOptions" id="EpocaCoevo" value="Coevo"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="EpocaCoevo">Coevo</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="EpocaOptions" id="EpocaTardio" value="Tardio"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="EpocaTardio">Tardio</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="EpocaOptions" id="EpocaOutra" value="Outra época"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="EpocaOutra">Outra época</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="EpocaOptions" id="EpocaReplica" value="Réplica"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="EpocaReplica">Réplica</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="EpocaOptions" id="EpocaReproducao" value="Reprodução"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="EpocaReproducao">Reprodução</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="EpocaOptions" id="EpocaFalsificacao" value="Falsificação"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="EpocaFalsificacao">Falsificação</label>
                                </div>

                            </div>
                            <hr />
                            <label>Qualidade:</label>
                            <div className="row text-center">

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="QualidadeOptions" id="QualidadeExcelente" value="Excelente"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="QualidadeExcelente">Excelente</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="QualidadeOptions" id="QualidadeMuitoBoa" value="Muito boa"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="QualidadeMuitoBoa">Muito boa</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="QualidadeOptions" id="QualidadeBoa" value="Boa"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="QualidadeBoa">Boa</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="QualidadeOptions" id="QualidadeRegular" value="Regular"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="QualidadeRegular">Regular</label>
                                </div>

                                <div className="input-group mb-3 col-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="QualidadeOptions" id="QualidadeFraca" value="Fraca"/>
                                        </div>
                                    </div>
                                    <label className="form-control" for="QualidadeFraca">Fraca</label>
                                </div>
                            </div>

                            <hr/>

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

                            <hr />

                            
                            <div className="row">
                                {/* BREVE DESCRIÇÃO */}
                                <div className="col-md-12 mb-3">
                                    <label>Breve descrição:</label>
                                    <textarea type="text" id="breveDescr" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Breve descrição" />
                                </div>
                                {/* ANALOGIAS */}
                                <div className="col-md-12 mb-3">
                                    <label>Analogias:</label>
                                    <input type="text" className="form-control" id="analogias" placeholder="Analogias" required />
                                </div>
                                {/* CONCLUSÕES */}
                                <div className="col-md-12 mb-3">
                                    <label>Conclusões:</label>
                                    <textarea type="text" id="conclusoes" style={{ resize: "none" }} rows="2" className="form-control" placeholder="Conclusões" />
                                </div>
                                {/* AUTORIA */}
                                <div className="col-md-4 mb-3">
                                    <label>Autoria / Oficina:</label>
                                    <input type="text" className="form-control" id="autoriaOfic" placeholder="Autoria / Oficina" required />
                                </div>
                                {/* DATAÇÃO */}
                                <div className="col-md-4 mb-3">
                                    <label>Datação:</label>
                                    <input type="text" className="form-control" id="datação" placeholder="Datação" required />
                                </div>
                                {/* LOCAL DE ORIGEM / PRODUÇÃO */}
                                <div className="col-md-4 mb-3">
                                    <label>Local de origem / Produção:</label>
                                    <input type="text" className="form-control" id="origProd" placeholder="Local de Origem / Produção" required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}
export default Pag2;

