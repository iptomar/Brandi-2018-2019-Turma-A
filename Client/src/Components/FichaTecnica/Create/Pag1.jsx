import React, { Component } from "react";
export class Pag1 extends Component {

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
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              <label>Ficha Técnica </label>
              <select id="DDLRoles" className="form-control mb-3">
                {/* {this.state.rolesList.map(function (object) {
                        return (
                          <option
                            className="dropdown-item"
                            id={object.roleID}
                            key={object.roleID}
                          >
                            {object.role}
                          </option>
                        );
                      })} */}
              </select>
            </div>
            
            {/* COLUNA 1 */}
            <div className="col-md-6 mb-3">
 
              <label>Localização:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Localização da obra" required/>
              
              <hr/>
              
              <label>Proprietário:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Proprietário" required/>
              <label>Código postal:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Endereço postal" required/>
              <label>Email:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Email" required/>
              <label>Contactos telefónicos:</label>
              <input type="text" className="form-control" id="" placeholder="Contactos telefónicos" required/>
            </div>

            {/* COLUNA 2 */}
            <div className="col-md-6 mb-3">

              <label>Dono da obra:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Dono da obra" required/>
              <label>Código postal:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Código postal" required/>
              <label>Contactos telefónicos:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Contactos telefónicos" required/>
              
              <hr/>
            
              <label>Mecenas:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Mecenas" required/>
              <label>Código postal:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Código postal" required/>
              <label>Contactos telefónicos:</label>
              <input type="text" className="form-control mb-3" id="" placeholder="Contactos telefónicos" required/>
            </div>     
          </div>
          <hr/>
        </div>
      </div>
    );
  }
}

export default Pag1;