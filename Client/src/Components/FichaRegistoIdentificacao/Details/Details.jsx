import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';
import Read from '../Details/Read';
import Edit from '../Details/Edit';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        text: "",
        notVisible: true,
        color: '',
      },
      edit: false,
      deleted: false,
      modal: ''
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.addFT = this.addFT.bind(this);
  }

  async componentDidMount() {
    await this.queryState(this.props.query);
  }

  async queryState(query) {
    if (query !== undefined) {
      switch (query) {
        case '&showConfirmEdited':
          this.setState({
            alert: {
              text: "Utilizador editado com sucesso",
              notVisible: false,
              color: "success"
            }
          });
          break;
        default:
          window.location = `/fichaRI/${this.props.id}/detalhes`;
          break;
      }
    }
  }

  async addFT(){
    window.location = "/fichaTecnica/criar/"+this.props.id;
  }

  toggleEdit() {
    this.setState(prevState => ({
      edit: !prevState.edit
    }));
  }

  delete = async e => {
    const request = await fetch(`/api/fichaRegistoIdentificacao/${this.props.id}/delete`, {
      method: 'POST',
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    request.json().then(resp => {
      let status = resp.stat;
      // Interpretar a resposta do servidor
      switch (status) {
        case "Deleted":
          window.location = `/fichaRI/&showConfirmDelete`;
          break;
        case "NotDeleted":
          this.setState({
            alert: {
              text: "Não foi possível remover a ficha.",
              notVisible: false,
              color: 'danger'
            }
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
      return (
        <div className="container">
          <div className="py-3 text-center">
            <h2>Detalhes da Ficha de Registo e Identificação</h2>
          </div>
          <div className="text-right mr-3 mb-3">
          <button className="btn btn-success" onClick={this.addFT}>
              <i className="fas fa-plus"/> Adicionar Ficha Técnica
            </button>
            <button 
              className="btn btn-warning ml-2" 
              onClick={() => {
                if(this.state.edit){
                  this.setState({ modal: 'Edit'});
                }else{
                  this.toggleEdit();
                }
              }}
              data-toggle={this.state.edit? "modal" : ""} 
              data-target={this.state.edit? "#modal" : ""} 
              align="right">
              {
                this.state.edit?
                  <i className="fas fa-undo"></i>
                :
                  <i className="fas fa-edit"></i>
              }
            </button>
            <button 
              type="button" 
              className="ml-2 btn btn-danger" 
              onClick={() => {
                this.setState({ 
                  modal: 'Delete' 
                })
              }}
              data-toggle="modal" 
              data-target="#modal">
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
          <AlertMsg text={this.state.alert.text} isNotVisible={this.state.alert.notVisible} alertColor={this.state.alert.color} />
          {
            this.state.edit?
              <Edit id={this.props.id} />
              :
              <Read id={this.props.id} />
          }

          { /* Modal de apagar*/}
          <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                  {this.state.modal==='Delete'?
                    'Apagar Ficha de Registo e Identificação'
                  :
                    'Editar Ficha de Registo e Identificação'
                  }
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.modal==='Delete'? 
                    'Tem a certeza que pretende apagar a Ficha de Registo e Identificação?'
                  :
                    'Todas as alterações realizadas não serão guardadas. Tem a certeza que pretende sair do editar?'
                  }
                  </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Não</button>
                  <button type="button" className="btn btn-primary" 
                  onClick={
                    this.state.modal==='Delete'? 
                      this.delete
                    : 
                      this.toggleEdit
                    } 
                    data-dismiss="modal">Sim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }
}

export default Details;
