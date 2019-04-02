import React, { Component } from "react";
import AlertMsg from '../../AlertMsg';
import Read from '../Details/Read';
import Edit from '../Details/Edit';

class Details extends Component {
  constructor(props) {
    super(props);
    document.body.style = "background: rgb(235, 235, 235)";
    this.state = {
      edit: false,
      deleted: false
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
    const request = await fetch(`/api/fichaRegistoIdentificacao/${this.props.id}/delete`, {
      method: 'POST',
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    request.json().then( resp => {
      let status = resp.stat;

      // Interpretar a resposta do servidor
      switch (status) {
        case "Deleted":
          this.setState({
            alertText: "A ficha foi removida com sucesso.",
            alertisNotVisible: false,
            alertColor: 'danger',
            deleted: true
          });
          window.scrollTo(0, 0);
          break;
        case "NotDeleted":
          this.setState({
            alertText: "Não foi possível remover a ficha.",
            alertisNotVisible: false,
            alertColor: 'danger'
          });
          window.scrollTo(0, 0);
          break;
      default:
        console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

  render() {
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (this.state.deleted){
        return (
          <div className="container">
            <div className="py-3 text-center">
              <h2>Detalhes da Ficha de Registo e Identificação</h2>
            </div>
            <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          </div>
        );
      }else{
        return (
          <div className="container">
            <div className="py-3 text-center">
              <h2>Detalhes da Ficha de Registo e Identificação</h2>
            </div>
            <div className="text-right mr-3">
              <button className="btn btn-primary" onClick={this.toggleEdit} align>
                <i className="fas fa-edit"></i>
              </button>
              <button type="button" className="ml-2 btn btn-danger" data-toggle="modal" data-target="#modalDelete">
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
            {
              this.state.edit? 
                <Edit id={this.props.id} /> 
              : 
                <Read id={this.props.id} /> 
            }

            { /* Modal de apagar*/ }
            <div className="modal fade" id="modalDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Apagar Ficha de Registo e Identificação</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Tem a certeza que pretende apagar a Ficha de Registo e Identificação?
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Não</button>
                    <button type="button" className="btn btn-danger" onClick={this.delete} data-dismiss="modal">Sim</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };
  }
}

export default Details;
