import React, { Component } from "react";
import FileUpload from "../../Globais/FileUpload";
import AlertMsg from "../../Globais/AlertMsg";

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
                            <form onSubmit={this.handleSubmit} id="formSubmit">
                                <label>Bem Integrado em Conjunto:</label>
                                <div className="row">
                                    <div className="col-md-1 mb-2">
                                        <input type="radio" id="" name="defaultExampleRadios" checked></input>
                                        <label>Sim</label>
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <input type="radio" id="" name="defaultExampleRadios" checked></input>
                                        <label >Não</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Tipo de Conjunto | Bens do Conjunto:</label>
                                        <input type="text" className="form-control" id ="tipoConjunto" placeholder="Tipo de Conjunto | Bens do Conjunto" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Elementos Constituintes do Bem Cultural:</label>
                                        <input type="text" className="form-control" id="elementosConst" placeholder="Elementos Constituintes do Bem Cultural" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Materiais | Elementos Acessórios:</label>
                                        <input type="text" className="form-control" id="elementosAcess" placeholder="Materiais | Elementos Acessórios" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Marcas | Inscrições | Assinaturas de Autoria:</label>
                                        <input type="text" className="form-control" id="assinaturasAutoria" placeholder="Marcas | Inscrições | Assinaturas de Autoria" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Marcas | Inscrições de Montagem de Elementos:</label>
                                        <input type="text" className="form-control" id="inscricoesMontagem" placeholder="Marcas | Inscrições de Montagem de Elementos" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Marcas | Inscrições de Construção:</label>
                                        <input type="text" className="form-control" id="inscricoesConstrucao" placeholder="Marcas | Inscrições de Construção:" required/>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Classificação Patrimonial:</label>
                                        <input type="text" className="form-control" id="classPatrimonial" placeholder="Classificação Patrimonial" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label>Estilo | Gosto</label>
                                        <input type="text" className="form-control" id="estiloGosto" placeholder="Estilo | Gosto" required/>
                                    </div>
                                </div>
                                <label>Época:</label>
                                <div className="row">
                                    <div className="col-md-2 mb-3">
                                        <input type="radio"  id="" name="epoca" checked></input>
                                        <label>Coevo</label>
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <input type="radio"  id="" name="epoca" checked></input>
                                        <label >Tardio</label>
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <input type="radio"  id="" name="epoca" checked></input>
                                        <label >Outra Época</label>
                                    </div>

                                    <div className="col-md-2 mb-3">
                                        <input type="radio"  id="" name="epoca" checked></input>
                                        <label >Réplica</label>
                                    </div>

                                    <div className="col-md-2 mb-3">
                                        <input type="radio"  id="" name="epoca" checked></input>
                                        <label >Reprodução</label>
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <input type="radio"  id="" name="epoca" checked></input>
                                        <label >Falsificação</label>
                                    </div>
                                </div>
                                <hr />
                                <label>Qualidade:</label>
                                <div className="row">
                                        <div className="col-md-2 mb-3">
                                            <input type="radio"  id="" name="qualidade" checked ></input>
                                            <label>Excelente</label>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <input type="radio"  id="" name="qualidade" checked></input>
                                            <label >Muito Boa</label>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <input type="radio"  id="" name="qualidade" checked></input>
                                            <label >Boa</label>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <input type="radio"  id="" name="qualidade" checked></input>
                                            <label >Regular</label>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <input type="radio"  id="" name="qualidade" checked></input>
                                            <label >Fraca</label>
                                        </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Pag2;

