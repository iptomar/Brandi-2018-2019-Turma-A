import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';
import LoadingAnimation from '../../Globais/LoadingAnimation';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        text: '',
        notVisible: true,
        color: '',
      },
      showAlert: false,
      data: null,
      tecnicosResp: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.dateTreatment = this.dateTreatment.bind(this);
  }

  componentDidMount(){
    this.fetchFichaRI(this.props.id);
  }

  async fetchFichaRI(id) {
    //Enviar pedido
    const response = await fetch(`/api/fichaRegistoIdentificacao/${id}`, {
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
          this.setState({ data: resp.resposta });
          this.fetchTecnicos();
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    }).catch( resp => {
      this.setState({
        showAlert: true,
        alert: { 
          text: 'Não existe conexão com o servidor.',
          notVisible: false,
          color: 'danger'
        }
      });
    });
  }

  async fetchTecnicos() {
    //Enviar pedido para receber 
    const response = await fetch("/api/tecnicos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      }
    });

    await response.json().then(resp => {
      let resposta = resp.resposta;
      // Definir quais os tecnicos que já se encontram associados à ficha
      for(let i=0; i<resposta.length; i++) {
        let bool = false;
        this.state.data.tecnicos.map((tecnico) => {
          if(tecnico.tecnicoID === resposta[i].tecnicoID){
            return bool=true;
          }
          return false;
        })
        // Novo objecto de tecnico
        let tec = {
          tecnicoID: resposta[i].tecnicoID,
          nome: resposta[i].nome,
          checked: bool
        }
        // Override do tecnico
        resposta[i]=tec;
      }
      this.setState({ 
        tecnicosResp: resposta
      })
    });
  }

  // Controla as alterações nas checkboxes (Necessidade do React)
  handleCheckboxChange(e) {
    let tecnicos = this.state.tecnicosResp;
    tecnicos.forEach(tecnico => {
      if (tecnico.tecnicoID+"" === e.target.value)
        tecnico.checked = e.target.checked;
    });
    this.setState({
      tecnicosResp: tecnicos
    });
  }
  
  // Controla as alterações nos inputs (Necessidade do React)
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState( prevState => ({
      data: {
        ...prevState.data,
        [name] : value
      }
    }));
  }

  // Verificar as checkboxes dos tecnicos. Retorna o array de tecnicos
  verifyCBS() {
    var cboxes = document.querySelectorAll("#tecnicosCheckbox");
    var len = cboxes.length;
    let idCBS = [];
    for (var i = 0; i < len; i++) if (cboxes[i].checked) idCBS.push(cboxes[i].value);
    return idCBS;
  }

  // Formatação da data
  dateTreatment(date){
    return date!==null? date.substring(0,10) : null;
  }

  edit = async e => {
    e.preventDefault();

    //Objeto data
    const data = {
      designacao: this.state.data.designacao,
      processoLCRM: this.state.data.processoLCRM,
      processoCEARC: this.state.data.processoCEARC,
      dataEntrada: this.dateTreatment(this.state.data.dataEntrada),
      dataConclusao: this.dateTreatment(this.state.data.dataConclusao),
      dataEntrega: this.dateTreatment(this.state.data.dataEntrega),
      coordenacao: this.state.data.coordenacao,
      direcaoTecnica: this.state.data.direcaoTecnica,
      localidade: this.state.data.localidade,
      tecnicosFK: this.verifyCBS(),
      interessadoFK: '1'
    };
    //Enviar pedido
    const response = await fetch(`/api/fichaRegistoIdentificacao/${this.props.id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

    //Aguardar resposta
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "Updated":
          window.location = `/fichaRI/${this.props.id}/detalhes&showConfirmEdited`;
          break;
        case "NotUpdated":
          this.setState({
            alert: {
              text: "Erro ao editar.",
              notVisible: false,
              color: "danger"
            }
          });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    }).catch(resp => {
      this.setState({
        showAlert: true,
        alert: {
          text: "Erro na comunicação com o servidor.",
          notVisible: false,
          color: "danger"
        }
      });
    });
  }

  render() {
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (this.state.data!==null) {
          let getThis = this;
          return (
            <div className="container">
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
                        name="designacao"
                        value={this.state.data.designacao}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Processo LCRM</label>
                      <input
                        type="text"
                        className="form-control"
                        name="processoLCRM"
                        value={this.state.data.processoLCRM}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Processo CEARC</label>
                      <input
                        type="text"
                        className="form-control"
                        name="processoCEARC"
                        value={this.state.data.processoCEARC}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Entrada</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataEntrada"
                        value={this.state.data.dataEntrada!==null? this.state.data.dataEntrada.substring(0,10) : ""}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Conclusão</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataConclusao"
                        value={this.state.data.dataConclusao!==null? this.state.data.dataConclusao.substring(0,10) : ""}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Entrega</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataEntrega"
                        value={this.state.data.dataEntrega!==null? this.state.data.dataEntrega.substring(0,10) : ""}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Coordenação</label>
                      <input
                        type="text"
                        className="form-control"
                        name="coordenacao"
                        value={this.state.data.coordenacao}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="font-weight-bold">Direção Técnica</label>
                      <input
                        type="text"
                        className="form-control"
                        name="direcaoTecnica"
                        value={this.state.data.direcaoTecnica}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <label>Técnico(s) Responsável(eis)</label>
                  <div className="row">
                    {
                      // Mostra uma loading bar enquanto os tecnicos não são carregados
                      this.state.tecnicosResp.length!==0? 
                        this.state.tecnicosResp.map(function (object) {
                          return (
                            <div className="input-group mb-3 col-md-3" key={object.tecnicoID}>
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input 
                                    type="checkbox" 
                                    id="tecnicosCheckbox" 
                                    value={object.tecnicoID}
                                    checked={object.checked}
                                    onChange={getThis.handleCheckboxChange}
                                  />
                                </div>
                              </div>
                              <label className="form-control">{object.nome}</label>
                            </div>
                          );
                        })
                      :
                        <LoadingAnimation />
                    }
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="font-weight-bold">Endereço Postal | Localidade</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="localidade" 
                        value={this.state.data.localidade}
                        onChange={this.handleChange}
                        />
                    </div>
                  </div>
                  <AlertMsg text={this.state.alert.text} isNotVisible={this.state.alert.notVisible} alertColor={this.state.alert.color} />
                  <hr className="mb-4" />
                  <button className="btn btn-primary btn-lg btn-block" onClick={this.toggleEdit} data-toggle="modal" data-target="#modalEdit">Guardar</button>
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
                      <button type="button" className="btn btn-danger" data-dismiss="modal">Não</button>
                      <button type="submit" className="btn btn-primary"  onClick={this.edit} data-dismiss="modal">Sim</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      } else {
        return (
          <div className="container">
            {this.state.showAlert? 
                <AlertMsg text={this.state.alert.text} isNotVisible={this.state.alert.notVisible} alertColor={this.state.alert.color} /> 
              : 
                <LoadingAnimation />
            }
          </div>
        );
      }
    };
  }
}

export default Edit;
