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
            <div className="Inicio container">
            <div className="container">
            <div className="pt-3 py-3 text-center">
                   <h4>Intervençoes Anteriores</h4>
                   <small>Intervenções ao longo da história do objeto, anteriores à intervenção no Lab.CR-Madeiras</small>
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
                       <textarea  id="estruturaIntervAnter" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
           

                   </div>
                   <div className="col d-flex justify-content-center">
                       <textarea id="superficieIntervAnter" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
           
                   
                   </div>
                   
                   <div className="col d-flex justify-content-center">
                       <textarea id="elementosAcessoriosIntervAnter" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
           
                   
                   </div>
               </div>
               <hr></hr>
              
               <hr></hr>
               <div className="pt-3 py-3 text-center">
                   <h5>Observações / Conclusões:</h5>
                  </div>
               <textarea id="observaçoesConclusoesPag6" type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
               
               <div className="pt-3 py-3 text-center">
                   <h4>Vontade Expressa do Propeietário ou do Dono da Obra</h4>
                  </div>
                <label>Tipo de intervenção:</label>
                <div className="row">                  
                   
                    <div className="input-group mb-3 col-md-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="radio" name="IntervOptions" id="intervPrevencao" value="Prevenção" defaultChecked/>
                            </div>
                        </div>
                        <label className="form-control" htmlFor="intervPrevencao">Prevenção</label>
                    </div>

                    <div className="input-group mb-3 col-md-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="radio" name="IntervOptions" id="intervConvercao" value="Conservação" defaultChecked/>
                            </div>
                        </div>
                        <label className="form-control" htmlFor="intervConvercao">Conservação</label>
                    </div>

                    <div className="input-group mb-3 col-md-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <input type="radio" name="IntervOptions" id="intervRestauro" value="Restauro" defaultChecked/>
                            </div>
                        </div>
                        <label className="form-control" htmlFor="intervRestauro">Restauro</label>
                    </div>

                </div>
            </div>
            
       </div>         
        );
    }
}
export default Pag6;

