import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';
import LoadingAnimation from '../../Globais/LoadingAnimation';

class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      data: null,
      loading: true,
      alert: false,
      ft: []
    };
  }

  componentDidMount() {
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
      // console.log(resp);
      switch (status) {
        case "Authenticated":
          this.setState(prevState => ({
            ...prevState,
            data: resp.resposta,
            loading: false
          }));
          this.getAndSetImage();
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    }).catch(resp => {
      this.setState(prevState => ({
        ...prevState,
        error: true,
        loading: true,
        alertText: 'Não existe conexão com o servidor.',
        alertisNotVisible: false,
        alertColor: 'danger'
      }))
    });
  }

  getAndSetImage() {
    const response = fetch("/api/fichaRegistoIdentificacao/imagem/" + this.props.id, {
      method: "GET",
      headers: {
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    response.then(resp => resp.blob())
      .then(blob => {
        let reader = new FileReader();
        reader.onload = function () {
          let img = document.querySelector("#imgPrev");
          img.src =  reader.result.toString();
          img.style.height = "300px";
        }
        reader.readAsDataURL(blob);
      });
  }

  render() {
    let getThis = this;
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (!this.state.loading) {
        return (
          <div className="container mb-4">
            <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="text-center">
                  <img
                    src=""
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
                      readOnly
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
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Processo CEARC</label>
                    <input
                      type="text"
                      className="form-control"
                      id="procCEARC"
                      value={this.state.data.processoCEARC}
                      readOnly
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
                      value={this.state.data.dataEntrada != null ? this.state.data.dataEntrada.substring(0, 10) : ""}
                      readOnly
                    />
                  </div>
                  {this.state.data.dataConclusao == null? 
                      <div></div> 
                    :
                      <div className="col-md-4 mb-3">
                      <label className="font-weight-bold">Data de Conclusão</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateConclusão"
                        value={this.state.data.dataConclusao != null ? this.state.data.dataConclusao.substring(0, 10) : ""}
                        readOnly
                      />
                    </div>
                  }

                  {this.state.data.dataEntrega == null? 
                      <div></div> 
                    :
                      <div className="col-md-4 mb-3">
                        <label className="font-weight-bold">Data de Entrega</label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateEntrega"
                          value={this.state.data.dataEntrega != null ? this.state.data.dataEntrega.substring(0, 10) : ""}
                          readOnly
                        />
                      </div>
                  }
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Coordenação</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coord"
                      value={this.state.data.coordenacao}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Direção Técnica</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dirTecn"
                      value={this.state.data.direcaoTecnica}
                      readOnly
                    />
                  </div>
                </div>
                <label className="font-weight-bold">Técnico(s) Responsável(eis)</label>
                <div className="row">
                  {this.state.data.tecnicos.map(function (object) {
                    return (
                      <div className="mb-3 col-md-3" key={object.tecnicoID}>
                        <label className="">{object.nome}</label>
                      </div>
                    );
                  })}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Tipologia</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tipologia"
                      value={this.state.data.tipologia}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Analogias</label>
                    <input
                      type="text"
                      className="form-control"
                      id="analogias"
                      value={this.state.data.analogias}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Dimensões</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dimensoes"
                      value={this.state.data.dimensoes}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold">Outras Dimensões</label>
                    <input
                      type="text"
                      className="form-control"
                      id="outrasDimensoes"
                      value={this.state.data.outrasDimensoes}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="font-weight-bold">Breve descrição</label>
                    <textarea type="text" id="breveDescricao" value={this.state.data.breveDescricao} readOnly
                      style={{ resize: "none" }} rows="2" className="form-control"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="font-weight-bold">Conclusões</label>
                    <textarea type="text" id="conclusoes" value={this.state.data.conclusoes} readOnly
                      style={{ resize: "none" }} rows="2" className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold">Autoria / Oficina</label>
                    <input
                      type="text"
                      className="form-control"
                      id="oficina"
                      value={this.state.data.oficina}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold">Datação</label>
                    <input
                      type="text"
                      className="form-control"
                      id="datacao"
                      value={this.state.data.datacao}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold">Local de origem / Produção</label>
                    <input
                      type="text"
                      className="form-control"
                      id="localOrigem"
                      value={this.state.data.localOrigem}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold">Super-categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      id="superCategorias"
                      value={this.state.data.superCategorias}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold">Categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categorias"
                      value={this.state.data.categorias}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold">Sub-categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subCategorias"
                      value={this.state.data.subCategorias}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <hr></hr>
              <h4>Fichas Técnicas Associadas</h4>
              <div>
                {
                  //Verifica se existem ficha técnicas associadas a esta ficha de registo
                  // e identificação
                  getThis.state.data.fichatecnicas.length !== 0 ?
                    <table className="table">
                      <tbody>
                        {
                          //Percorre todas fichas técnicas e apresenta-as
                          // getThis.state.data.fichatecnicas.forEach(element => 
                          getThis.state.data.fichatecnicas.map(function (obj) {
                            return (
                              <tr key={obj.fichaTecnicaID}>
                                <th>
                                  <a href={"/fichaTecnica/" + obj.fichaTecnicaID + "/detalhes"}>
                                    Ficha Técnica Nº
                                      {obj.fichaTecnicaID}
                                  </a>
                                </th>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </table>
                    :
                    <div>
                      {/* Se não, apresenta uma mensagem informativa */}
                      <p>Ainda não existem fichas técnicas associadas a este objeto.</p>
                      {
                        <a href={"/fichaTecnica/criar/" + getThis.props.id}>Crie uma nova ficha técnica</a>
                      }
                    </div>
                }
              </div>
            </div>
            <div>
              <hr></hr>
              <h4>Testes de Solventes Associados</h4>
              <div>
                {
                  //Verifica se existem testes de solventes associados a esta ficha de registo
                  // e identificação
                  getThis.state.data.testesSolventes.length !== 0 ?
                    <table className="table">
                      <tbody>
                        {
                          //Percorre todos os testes de solventes e apresenta-os 
                          getThis.state.data.testesSolventes.map(function (obj) {
                            return (
                              <tr key={obj.id}>
                                <th>
                                  <a href={"/testesSolubilizacao/" + obj.id + "/detalhes"}>
                                    Teste de Solvente Nº
                                      {obj.id}
                                  </a>
                                </th>
                              </tr> 
                            );
                          })
                        }
                      </tbody>
                    </table>
                    :
                    <div>
                      {/* Se não, apresenta uma mensagem informativa */}
                      <p>Ainda não existem testes de solventes associados a este objeto.</p>
                      {
                        <a href={"/testesSolubilizacao/" + getThis.props.id+ "/criar"}>Crie uma nova teste de solventes</a>
                      }
                    </div>
                }
              </div>
            </div>
            <div>
              <hr></hr>
              <h4>Folhas de Obra Associadas</h4>
              <div>
                {
                  //Verifica se existem folha de obra associadas a esta ficha de registo
                  // e identificação
                  getThis.state.data.folhasObra.length !== 0 ?
                    <table className="table">
                      <tbody>
                        {
                          //Percorre todas as folhas de obra e apresenta-as 
                          getThis.state.data.folhasObra.map(function (obj) {
                            return (
                              <tr key={obj.folhaObraID}>
                                <th>
                                  <a href={"/folhaDeObra/" + obj.folhaObraID + "/editar"}>
                                    Folha de Obra Nº
                                      {obj.folhaObraID}
                                  </a>
                                </th>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </table>
                    :
                    <div>
                      {/* Se não, apresenta uma mensagem informativa */}
                      <p>Ainda não existem folhas de obra associadas a este objeto.</p>
                      {
                        <a href={"/folhaDeObra/" + getThis.props.id + "/criar"}>Crie uma nova folha de obra</a>
                      }
                    </div>
                }
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            {this.state.alert ?
              <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
              :
              <LoadingAnimation />
            }
          </div>
        );
      }
    };
  }
}

export default Read;
