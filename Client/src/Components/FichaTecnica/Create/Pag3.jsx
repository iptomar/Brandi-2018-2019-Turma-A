import React, { Component } from "react";
import FileUpload from "../../Globais/FileUpload";
import AlertMsg from "../../Globais/AlertMsg";

class Pag3 extends Component {

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
            <div class="row">
                <div class="col-6 col-md-4">
                    <div>
                        <label>Descrição:</label>
                    </div>
                    <div></div>
                </div>
                
                <div class="col-12 col-md-8">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 col-md-4"></div>
                            <div class="col-6 col-md-4">Frio/Húmido</div>
                            <div class="col-6 col-md-4">Quente/Seco</div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-md-4"> <label>Temperatura (em ºC):</label></div>
                            <div class="col-6 col-md-4"> <input type="text" className="form-control"  placeholder="desconhecido" /></div>{/*falta a restriçao dos valores*/}
                            <div class="col-6 col-md-4"><input type="text" className="form-control"  placeholder="desconhecido" /></div>{/*falta a restriçao dos valores*/}
                        </div>
                        <div class="row">
                            <div class="col-6 col-md-4"><label>Humidade relativa (em %):</label></div>
                            <div class="col-6 col-md-4"><input type="text" className="form-control"  placeholder="desconhecido" /></div>{/*falta a restriçao dos valores*/}
                            <div class="col-6 col-md-4"><input type="text" className="form-control"  placeholder="desconhecido" /></div>{/*falta a restriçao dos valores*/}
                        </div>
                        <div class="row">
                            <div class="col-6 col-md-4"><label>periodo do ano:</label></div>
                            <div class="col-6 col-md-4">
                                
                                    <div class="row">          
                                        <div class="col">                          
                                            <input type="text" className="form-control" placeholder="Inicio" />
                                        </div>
                                        <div class="col">                          
                                            <input type="text" className="form-control" placeholder="Fim" />
                                        </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                            <div class="row">          
                                        <div class="col">                          
                                            <input type="text" className="form-control" placeholder="Inicio" />
                                        </div>
                                        <div class="col">                          
                                            <input type="text" className="form-control" placeholder="Fim" />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
                </div>
                  
            </div>  
            <div className="pt-3 py-3 text-center">
              <h4>Iluminação</h4>
            </div>
            <div class="row">
                <div class="col text-center py-2 "><h5>Artificial </h5> </div>
                <div class="col text-center py-2" ><h5>Natural </h5> </div>
            </div>
            
            <div class="row">
                <div class="col "><label>Tipo: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
                <div class="col"><label>Origem: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>

            <div class="row">
                <div class="col"><label>Valor de Iluminância: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
                <div class="col"><label>Valor de Iluminância: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>

            <div class="row">
                <div class="col"><label>Valor de U.V Medidos (nw/cm^2): </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
                <div class="col"><label>Valor de U.V Medidos (nw/cm^2): </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>
            
            <div class="row">
                <div class="col"><label>Valor real de U.V (nw/cm^2): </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
                <div class="col"><label>Valor real de U.V (nw/cm^2): </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>
            
            <div className="pt-3 py-3 text-center">
              <h4>Poluição</h4>
            </div>
            <div class="row">
                <div class="col-2"><label>Agentes Poluidores:: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>
            <div class="row">
                <div class="col-2 "><label>Fontes|Origem: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>
            <div class="row">
                <div class="col-2 "><label>Resultados: </label> </div>
                <div class="col">  <input type="text" className="form-control" placeholder="" /> </div>
            </div>
            
                <div class="col pt-3 py-3 "><h4>Observações | Conclusões </h4> </div>
                <div class="col">  <textarea type="text" className="form-control" placeholder="" /> </div>
           
            

            </div>
        </div>
    );
  }
}
export default Pag3;
