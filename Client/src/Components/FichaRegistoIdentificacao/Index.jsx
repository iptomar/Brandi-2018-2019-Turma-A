import React, { Component } from "react";
import AlertMsg from '../Globais/AlertMsg';
import LoadingAnimation from '../Globais/LoadingAnimation';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: '',
      list: [],
      loading: true,
      numPage: 1,
      atualPage: 1
    };
    this.getFichasRI(1);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.queryState(this.props.query);
  }

  queryState(query) {
    if (query !== undefined) {
      switch (query) {
        case '&showConfirmDelete':
          this.setState({
            alertText: "Ficha eliminada com sucesso",
            alertisNotVisible: false,
            alertColor: "success"
          });
          break;
        case '&showConfirm':
          this.setState({
            alertText: "Ficha criada com sucesso",
            alertisNotVisible: false,
            alertColor: "success"
          });
          break;
        default:
          window.location = "/fichaRI";
          break;
      }
    }
  }

  async getFichasRI(nPage) {
    //Enviar pedido
    const response = await fetch("/api/fichaRegistoIdentificacao/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token"),
        "pagenumber": nPage
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      console.log(response);
      this.setState({ list: resp.resposta, loading: false, atualPage: nPage, numPage: Math.ceil(response.headers.get('totalpages') / 12)});
    });
  }

  async changePage(e){
    await this.getFichasRI(e.target.value);
  }
  
  createPagination(){
    let pag = [];
      for (let i = 1; i <= this.state.numPage; i++) {
       pag.push(<li className="page-item" key={i}><button className="page-link" value={i} onClick={this.changePage}>{i}</button></li>) ;
    }
    return pag;
  }

  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="Inicio container">
          <div className="row">
            <div className="col-md-9">
              <h2 className="py-3 mb-3 text-center">
                Fichas de Registo e Identificação
              </h2>
            </div>
            <div className="col-md-3" style={{ display: "inline" }}>
              <a href="/fichaRI/criar" className="mt-3 btn btn-success">
                <i className="fas fa-plus fa-white" /> Adicionar Ficha
              </a>
            </div>
          </div>
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          {
            this.state.loading ?
              <LoadingAnimation />
              :
              <div className="row">
                {!this.state.list.length !== 0 ? (
                  this.state.list.map(function (obj) {
                    let href = "/fichaRI/" + obj.fichaRegistoID + "/detalhes";
                    return (
                      <div className="col-sm-3 mb-3" key={obj.fichaRegistoID}>
                        <a href={href}>
                          <div className="card">
                            <div className="card-body p-0">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Our_Lady_of_the_Gate_of_Dawn_Interior_During_Service%2C_Vilnius%2C_Lithuania_-_Diliff.jpg/800px-Our_Lady_of_the_Gate_of_Dawn_Interior_During_Service%2C_Vilnius%2C_Lithuania_-_Diliff.jpg" alt="Imagem" className="card-img-top img-fluid"
                                style={{ objectFit: "cover", height: "200px", width: "300px" }} />
                              <div className="card-footer text-muted text-center">
                                {obj.designacao}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })
                ) : (
                    <div>
                      <h5>Ainda não existe nenhuma ficha técnica</h5>
                      <h6>
                        <a href="/fichaRI/criar">Adicione</a> já uma ficha
                </h6>
                    </div>
                  )}
              </div>
          }
          <nav aria-label="Page navigation example center">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Antes</a></li>
              {this.createPagination()}
              <li className="page-item"><a className="page-link" href="#">Depois</a></li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Index;
