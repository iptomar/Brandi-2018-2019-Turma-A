import React, { Component } from "react";
import DetailsRead from "../../Components/FichaTecnica/DetailsRead";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        <div className="Details container">
          <div className="row mb-4">
            <div className="col-md-4">
                <p className="h4">Ficha Técnica</p>
            </div>
            <div className="ReadOptions col-md-8" align="right">
              <button type="submit" className="btn col-md-2 mr-2 btn-primary">Editar</button>
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalApagar">Apagar</button>
            </div>
          </div>
          <DetailsRead />
          <div class="modal fade" id="modalApagar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Apagar Ficha Técnica</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Tem a certeza que pretende apagar esta ficha técnica?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Não</button>
                  <button type="button" class="btn btn-danger">Sim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
