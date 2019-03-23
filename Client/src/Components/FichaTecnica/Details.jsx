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
        </div>
    );
  }
}

export default Create;
