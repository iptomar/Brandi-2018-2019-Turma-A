import React, { Component } from "react";
import Read from "./Read";
import Edit from "./Edit";
import AlertMsg from '../../AlertMsg';

class Create extends Component {
  constructor(props, {match}) {
    super(props);
    // recolher id do url
    let href = window.location.href.toString().split("/");
    this.state = {
      edit: false,
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      id: href[5]
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.delete = this.delete.bind(this);
    console.log(match);
  }

  toggleEdit() {
    this.setState(state => ({
      edit: !state.edit
    }));
  }

  delete = async e => {
    const request = await fetch(`/api/fichatecnica/${this.state.id}/delete`, {
      method: 'POST',
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    request.json().then( resp => {
      this.setState({
        alertText: "A ficha foi removida com sucesso.",
        alertisNotVisible: false,
        alertColor: 'danger'
      });
    });
  }

  render() {
    return (
        <div className="Details container">
          <div className="row mb-4">
            <div className="col-md-4">
                <p className="h4">Ficha Técnica</p>
            </div>
            <div className="ReadOptions col-md-8" align="right">
              <button type="button" className="btn col-md-2 mr-2 btn-primary" onClick={this.toggleEdit}>Editar</button>
              <button type="button" className="btn col-md-2 btn-danger" data-toggle="modal" data-target="#modalApagar">Apagar</button>
            </div>
          </div>
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          {
            // Caso o botão editar seja clicado
            !this.state.edit?
              <Read id={this.state.id} />
            :
              <Edit />
          }
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
                  <button type="button" class="btn btn-danger" onClick={this.delete} data-dismiss="modal">Sim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
