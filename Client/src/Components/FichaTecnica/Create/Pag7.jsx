import React, { Component } from "react";

class Pag7 extends Component {

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
                    <h4>Intervenção Proposta pelo Conservador-Restaurador</h4>
                    <small>Intervenções ao longo da história do objeto, anteriores à intervenção no Lab. CRM</small>
                </div>
                <div className="pt-3 py-3 text-center">
                    <h4>Tipo de intervenção</h4>
                </div>
                <label>Tipo de intervenção:</label>
                <div className="row">

                    <div className="input-group mb-3 col-md-3 text-center">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="radio" name="IntervConsResOptions" id="intervPrevencaoConsRes" value="Prevenção" defaultChecked />
                            </div>
                        </div>
                        <label className="form-control" htmlFor="intervPrevencaoConsRes">Prevenção</label>
                    </div>

                    <div className="input-group mb-3 col-md-3 text-center">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="radio" name="IntervConsResOptions" id="intervConvercaoConsRes" value="Conservação" defaultChecked />
                            </div>
                        </div>
                        <label className="form-control" htmlFor="intervConvercaoConsRes">Conservação</label>
                    </div>

                    <div className="input-group mb-3 col-md-3 text-center">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="radio" name="IntervConsResOptions" id="intervRestauroConsRes" value="Restauro" defaultChecked />
                            </div>
                        </div>
                        <label className="form-control" htmlFor="intervRestauroConsRes">Restauro</label>
                    </div>
                </div>
                <hr/>
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
export default Pag7;

