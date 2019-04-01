import React, { Component } from "react";
import AlertMsg from '../AlertMsg';
import LoadingAnimation from '../LoadingAnimation';

class Details extends Component {
  constructor(props) {
    super(props);
    document.body.style = "background: rgb(235, 235, 235)";
    this.state = {
      data: null,
      edit: false,
      loading: true,
      alert: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    this.getFichaRI(this.props.id);
  }

  async getFichaRI(id) {
    //Enviar pedido
    const response = await fetch(`/api/fichaRegistoIdentificacao/${this.props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta, loading: false });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    }).catch( resp => {
      this.setState({
        error: true,
        alertText: 'Não existe conexão com o servidor.',
        alertisNotVisible: false,
        alertColor: 'danger'
      })
    });
  }

  toggleEdit() {
    this.setState(state => ({
      edit: !state.edit
    }));
  }

  edit = async e => {
    e.preventDefault();

    //Objeto data
    const data = {
      designacao: document.getElementById("dObjeto").value,
      processoLCRM: document.getElementById("procLCRM").value,
      processoCEARC: document.getElementById("procCEARC").value,
      dataEntrada: document.getElementById("dateEntrada").value,
      dataConclusao: document.getElementById("dateConclusão").value,
      dataEntrega: document.getElementById("dateEntrega").value,
      coordenacao: document.getElementById("coord").value,
      direcaoTecnica: document.getElementById("dirTecn").value,
      localidade: document.getElementById("endPostLocal").value,
      tecnicosFK: [document.getElementById("tecResp").value],
      interessadoFK: 1,
      visible: 1
    };
    //Enviar pedidos
    const response = await fetch(`/api/fichaRegistoIdentificacao/${this.props.id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "Updated":
          this.setState({
            alertText: "Editado com sucesso.",
            alertisNotVisible: false,
            alertColor: "primary"
          });
          window.scrollTo(0, 0);
          break;
        case "NotUpdated":
          window.location = '/fichaRI';
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
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
            alert: true,
            loading: true
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
      if (!this.state.loading) {
          return (
            <div className="container">
              <div className="py-3 text-center">
                <h2>Detalhes da Ficha de Registo e Identificação</h2>
              </div>
              <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="text-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg"
                      id="imgPrev"
                      className="rounded img-thumbnail"
                      alt="Imagem"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 order-md-1">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="font-weight-bold">Designação do Objeto</label>
                      <input
                        type="text"
                        className="form-control"
                        id="dObjeto"
                        value={this.state.data.designacao}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { designacao : evt.target.value}
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Processo LCRM</label>
                      <input
                        type="text"
                        className="form-control"
                        id="procLCRM"
                        value={this.state.data.processoLCRM}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { processoLCRM : evt.target.value}
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Processo CEARC</label>
                      <input
                        type="text"
                        className="form-control"
                        id="procCEARC"
                        value={this.state.data.processoCEARC}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { processoCEARC : evt.target.value}
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Entrada</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateEntrada"
                        value={this.state.data.dataEntrada!=null? this.state.data.dataEntrada.substring(0,10) : ""}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { dataEntrada : evt.target.value}
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Conclusão</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateConclusão"
                        value={this.state.data.dataConclusao!=null? this.state.data.dataConclusao.substring(0,10) : ""}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { dataConclusao : evt.target.value}
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Entrega</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateEntrega"
                        value={this.state.data.dataEntrega!=null? this.state.data.dataEntrega.substring(0,10) : ""}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { dataEntrega : evt.target.value}
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Coordenação</label>
                      <input
                        type="text"
                        className="form-control"
                        id="coord"
                        value={this.state.data.coordenacao}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { coordenacao : evt.target.value}
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Direção Técnica</label>
                      <input
                        type="text"
                        className="form-control"
                        id="dirTecn"
                        value={this.state.data.direcaoTecnica}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { direcaoTecnica : evt.target.value}
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="font-weight-bold">Técnico(s) Responsável(eis)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tecResp"
                        value='1'
                        readOnly={!this.state.edit}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="font-weight-bold">Endereço Postal | Localidade</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="endPostLocal" 
                        value={this.state.data.localidade}
                        readOnly={!this.state.edit}
                        onChange={(evt) => {
                          this.setState({
                            data: { localidade : evt.target.value}
                          });
                        }}
                        />
                    </div>
                  </div>
                  <hr className="mb-4" />

                  {
                    this.state.edit? 
                      <button className="btn btn-primary btn-lg btn-block" onClick={this.toggleEdit} data-toggle="modal" data-target="#modalEdit">Guardar</button>
                    :
                      <button className="btn btn-primary btn-lg btn-block" onClick={this.toggleEdit}>Editar</button>
                  }

                  <button type="button" className="btbtn btn-danger btn-lg btn-block" data-toggle="modal" data-target="#modalDelete">Apagar</button>
                </div>
              </div>

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

              { /* Modal de editar*/ }

              <div className="modal fade" id="modalEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Editar Ficha de Registo e Identificação</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Pretende guardar as alterações?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal">Não</button>
                      <button type="submit" className="btn btn-success"  onClick={this.edit} data-dismiss="modal">Sim</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
      } else {
        return (
          <div className="container">
            <div className="py-3 text-center">
              <h2>Detalhes da Ficha de Registo e Identificação</h2>
            </div>
            {this.state.alert? 
                <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} /> 
              : 
                <LoadingAnimation height="6rem" width="6em" />
            }
          </div>
        );
      }
    };
  }
}

export default Details;
