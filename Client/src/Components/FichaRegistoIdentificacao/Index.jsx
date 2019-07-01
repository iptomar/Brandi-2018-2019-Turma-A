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
  }

  componentDidMount() {
    this.queryState(this.props.query);
    this.changePage = this.changePage.bind(this);
    this.createPagination = this.createPagination.bind(this);
    this.stateImage = this.stateImage.bind(this);
    this.pesquisa = this.pesquisa.bind(this);
    this.stateImage();
  }

  stateImage(num){
    var min = 12*(this.state.atualPage-1);
    var max = 12*this.state.atualPage - (12-num)-1;
    for(var i = min; i <= max; i++ ) this.getImage(this.state.list[i].fichaRegistoID);
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
    let pesq;
    try {
      pesq = document.querySelector('#pesquisaBar').value;
    } catch (error) {
      pesq = ""; 
    }
    //Enviar pedido
    const response = await fetch("/api/fichaRegistoIdentificacao?pagenumber="+nPage+"&pesquisa="+pesq, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token"),
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      this.setState({ list: resp.resposta, loading: false, atualPage: nPage, numPage: Math.ceil(response.headers.get('totalpages') / 12)});
    });
    this.stateImage(this.state.list.length);
  }

  async changePage(e){
    if(e.target.value === '-') await this.getFichasRI(this.state.atualPage-1);
    else if(e.target.value === '+') await this.getFichasRI(this.state.atualPage+1);
          else await this.getFichasRI(e.target.value);
  }
  
  createPagination(){
    let pag = [];
    if(this.state.atualPage === 1) pag.push(<li className="page-item disabled" key="-"><button className="page-link">Antes</button></li>);
    else pag.push(<li className="page-item" key="-"><button className="page-link" value="-" onClick={this.changePage}>Antes</button></li>);
      for (let i = 1; i <= this.state.numPage; i++) {
        if(this.state.atualPage === i) pag.push(<li className="page-item disabled" key={i}><button className="page-link">{i}</button></li>);
        else pag.push(<li className="page-item" key={i}><button className="page-link" value={i} onClick={this.changePage}>{i}</button></li>);
    }
    if(this.state.atualPage === this.state.numPage) pag.push(<li className="page-item disabled" key="+"><button className="page-link">Depois</button></li>);
    else pag.push(<li className="page-item" key="+"><button className="page-link" value="+" onClick={this.changePage}>Depois</button></li>);
    return pag;
  }

  getImage(id) {
    const response = fetch("/api/fichaRegistoIdentificacao/imagem/"+id, {
      method: "GET",
      headers: {
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    response.then(resp => resp.blob())
    .then(blob =>{
      let reader = new FileReader();
      reader.onload = function () {
        try {
          document.getElementById(id+"img").src = reader.result.toString();
        } catch (error) {}  
      }
      reader.readAsDataURL(blob);          
    });
  }

  pesquisa(){
      this.getFichasRI(1);
  }

  render() {
    // let getThis = this;
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
                <i className="fas fa-plus fa-white" /> Adicionar Ficha de R. e I.
              </a>
            </div>
          </div>
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          {
            this.state.loading ?
              <LoadingAnimation />
              :
              <div className="row">
                <div className="input-group mb-3">
                  <input id="pesquisaBar" onChange={this.pesquisa} type="text" className="form-control" placeholder="Pesquisa" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                </div>
                {this.state.list.length !== 0 ? (
                  this.state.list.map(function (obj) {
                    let href = "/fichaRI/" + obj.fichaRegistoID + "/detalhes";
                    return (
                      <div className="col-sm-3 mb-3" key={obj.fichaRegistoID}>
                        <a href={href}>
                          <div className="card">
                            <div className="card-body p-0" id={obj.fichaRegistoID}>
                              <img id={obj.fichaRegistoID+"img"}  src="" alt="Imagem" className="card-img-top img-fluid" style={{ objectFit: "cover", height: "200px", width: "300px" }} />
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
                    <div style={{margin:"10px"}}>
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
              {this.createPagination()}
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Index;
