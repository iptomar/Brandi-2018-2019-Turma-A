import React, { Component } from "react";
import Read from "./Read";
import Edit from "./Edit";
import AlertMsg from '../../Globais/AlertMsg';

class Details extends Component {
    constructor(props) {
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
      }
      
  toggleEdit() {
    this.setState(state => ({
      edit: !state.edit
    }));
  }

  delete = async e => {
    const request = await fetch(`/api/testesSolubilizacao/${this.state.id}/delete`, {
      method: 'POST',
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    request.json().then(resp => {
      this.setState({
        alertText: "O teste foi removido com sucesso.",
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
            <p className="h2">Teste de Solventes</p>
            <p className="h5">Teste de eficácia dos solventes na limpeza e solubilização de estratos e sujidades</p>
          </div>
          <div className="ReadOptions col-md-8" align="right">
            <button type="button" className="btn col-md-2 mr-2 btn-primary" onClick={this.toggleEdit}>Editar</button>
            <button type="button" className="btn col-md-2 btn-danger" data-toggle="modal" data-target="#modalApagar">Apagar</button>
          </div>
        </div>
        <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
        {
          // Caso o botão editar seja clicado
          !this.state.edit ?
            <Read id={this.state.id} />
            :
            <Edit />
        }
        <div class="modal fade" id="modalApagar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Apagar teste de solventes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Tem a certeza que pretende apagar este teste de solventes?
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

export default Details;