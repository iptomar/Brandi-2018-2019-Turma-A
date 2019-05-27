import React, { Component } from "react";

class Pag6 extends Component {

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
                        <h4>Intervenções Anteriores</h4>
                        <small>Intervenções ao longo da história do objeto, anteriores à intervenção no Lab. CRM</small>
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
                            <textarea id="estruturaIntervAnter" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                        <div className="col d-flex justify-content-center">
                            <textarea id="superficieIntervAnter" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <textarea id="elementosAcessoriosIntervAnter" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <hr/>

                    
                    <div className="pt-3 py-3 text-center">
                        <h5>Observações / Conclusões:</h5>
                    </div>
                    <textarea id="observaçoesConclusoesPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                    <div className="pt-3 py-3 text-center">
                        <h4>Vontade Expressa do Proprietário ou do Dono da Obra</h4>
                    </div>
                    <label>Tipo de intervenção:</label>
                    <div className="row">

                        <div className="input-group mb-3 col-md-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" name="IntervOptions" id="intervPrevencao" value="Prevenção" defaultChecked />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="intervPrevencao">Prevenção</label>
                        </div>

                        <div className="input-group mb-3 col-md-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" name="IntervOptions" id="intervConvercao" value="Conservação" defaultChecked />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="intervConvercao">Conservação</label>
                        </div>

                        <div className="input-group mb-3 col-md-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" name="IntervOptions" id="intervRestauro" value="Restauro" defaultChecked />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="intervRestauro">Restauro</label>
                        </div>

                    </div>

                    <label>Aspetos Especificos:</label>
                    <textarea id="aspetosEspecificosPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />

                    <div className="pt-3 py-3 text-center">
                        <h4>Tipo de intervenção proposta pelo Conservador-Restaurador</h4>
                    </div>
                    <label>Tipo de intervenção:</label>
                    <div className="row">

                        <div className="input-group mb-3 col-md-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" name="IntervConsResOptions" id="intervPrevencaoConsRes" value="Prevenção" defaultChecked />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="intervPrevencaoConsRes">Prevenção</label>
                        </div>

                        <div className="input-group mb-3 col-md-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" name="IntervConsResOptions" id="intervConvercaoConsRes" value="Conservação" defaultChecked />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="intervConvercaoConsRes">Conservação</label>
                        </div>

                        <div className="input-group mb-3 col-md-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <input type="radio" name="IntervConsResOptions" id="intervRestauroConsRes" value="Restauro" defaultChecked />
                                </div>
                            </div>
                            <label className="form-control" htmlFor="intervRestauroConsRes">Restauro</label>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <h4>Proposta metodológica de intervenção</h4>
                        </div>
                        <div className="col text-center">
                            <h4>Recursos</h4>
                            <small>Materiais | Técnicos | Tecnológicos</small>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label>Estrutura:</label>
                            <textarea id="EstruturaPropPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                        <div className="col">
                            <label style={{ paddingTop: "19px" }}></label>
                            <textarea id="EstruturaPropRecPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label>Superfície:</label>
                            <textarea id="SuperficiePropPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                        <div className="col">
                            <label style={{ paddingTop: "19px" }}></label>
                            <textarea id="SuperficiePropRecPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                    </div>



                    <div className="row">
                        <div className="col">
                            <label>Elementos Acessórios:</label>
                            <textarea id="ElementosAcessPropPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>
                        <div className="col">
                            <label style={{ paddingTop: "19px" }}></label>
                            <textarea id="ElementosAcessPropRecPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                        </div>

                    </div>
                    <div className="pt-3 py-3 text-center">
                        <h5>Observações / Conclusões:</h5>
                    </div>
                    <textarea id="observaçoesConclusoesPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />

                </div>
        );
    }
}
export default Pag6;

