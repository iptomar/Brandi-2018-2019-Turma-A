import React, { Component } from "react";
import Materiais from "../Create/Materiais"
import Tecnicas from "../Create/Tecnicas"

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
                            <div className="row">
                                <div className="col-md-1 mb-2">
                                    <input type="radio" id="" name="defaultExampleRadios" ></input>
                                    <label>Sim</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="defaultExampleRadios" ></input>
                                    <label >Não</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Tipo de Conjunto | Bens do Conjunto:</label>
                                    <input type="text" className="form-control" id="tipoConjunto" placeholder="Tipo de Conjunto | Bens do Conjunto" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Elementos Constituintes do Bem Cultural:</label>
                                    <input type="text" className="form-control" id="elementosConst" placeholder="Elementos Constituintes do Bem Cultural" required />
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
                                    <input type="text" className="form-control" id="assinaturasAutoria" placeholder="Marcas | Inscrições | Assinaturas de Autoria" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Marcas | Inscrições de Montagem de Elementos:</label>
                                    <input type="text" className="form-control" id="inscricoesMontagem" placeholder="Marcas | Inscrições de Montagem de Elementos" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Marcas | Inscrições de Construção:</label>
                                    <input type="text" className="form-control" id="inscricoesConstrucao" placeholder="Marcas | Inscrições de Construção:" required />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Classificação Patrimonial:</label>
                                    <input type="text" className="form-control" id="classPatrimonial" placeholder="Classificação Patrimonial" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Estilo | Gosto:</label>
                                    <input type="text" className="form-control" id="estiloGosto" placeholder="Estilo | Gosto" required />
                                </div>
                            </div>
                            <label>Época:</label>
                            <div className="row">
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="epoca" ></input>
                                    <label>Coevo</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="epoca" ></input>
                                    <label >Tardio</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="epoca" ></input>
                                    <label >Outra Época</label>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="epoca" ></input>
                                    <label >Réplica</label>
                                </div>

                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="epoca" ></input>
                                    <label >Reprodução</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="epoca" ></input>
                                    <label >Falsificação</label>
                                </div>
                            </div>
                            <hr />
                            <label>Qualidade:</label>
                            <div className="row">
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="qualidade"  ></input>
                                    <label>Excelente</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="qualidade" ></input>
                                    <label >Muito Boa</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="qualidade" ></input>
                                    <label >Boa</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="qualidade" ></input>
                                    <label >Regular</label>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <input type="radio" id="" name="qualidade" ></input>
                                    <label >Fraca</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <Materiais />
                                    <Tecnicas />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Breve Descrição:</label>
                                    <textarea type="text" className="form-control" placeholder="Breve Descrição" id="breveDescr" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Analogias:</label>
                                    <input type="text" className="form-control" id="analogias" placeholder="Analogias" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Conclusões:</label>
                                    <textarea type="text" className="form-control" placeholder="Conclusões" id="conclusoes" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <table className="table table-sm table-hover" >
                                        <tbody >
                                            <tr >
                                                <td > <label >Autoria | Oficina:</label> </td>
                                                <td> <label >Datação:</label> </td>
                                                <td> <label >Local de Origem | Produção:</label> </td>
                                            </tr>
                                            <tr>
                                                <td >
                                                    <input type="text" className="form-control" id="autoriaOfic" placeholder="Autoria | Oficina" required />
                                                </td>
                                                <td >
                                                    <input type="text" className="form-control" id="datação" placeholder="Datação" required />
                                                </td>
                                                <td >
                                                    <input type="text" className="form-control" id="origProd" placeholder="Local de Origem | Produção" required />
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Pag2;

