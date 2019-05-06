import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';
import LoadingAnimation from '../../Globais/LoadingAnimation';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: '',
      list: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
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
                Interessados
              </h2>
            </div>
            <div className="col-md-3" style={{ display: "inline" }}>
              <a href="/interessados/criar" className="mt-3 btn btn-success">
                <i className="fas fa-plus fa-white" /> Adicionar Interessado
              </a>
            </div>
          </div>
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          {
            this.state.loading ?
              <LoadingAnimation />
              :
              <div className="row">
                {this.state.list.length !== 0 ? (
                  this.state.list.map(function (obj) {
                    let href = "/fichaRI/" + obj.fichaRegistoID + "/detalhes";
                    return (
                      <div className="col-sm-3 mb-3" key={obj.fichaRegistoID}>
                        <a href={href}>
                          <div className="card">
                            <div className="card-body p-0" id={obj.fichaRegistoID}>
                              <img id={obj.fichaRegistoID+"img"}  src="..." alt="Imagem" className="card-img-top img-fluid" style={{ objectFit: "cover", height: "200px", width: "300px" }} />
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
                    <div className="mx-auto my-5">
                      <h5>Ainda não existe nenhum Interessado</h5>
                      <h6>
                        <a href="/interessados/criar">Adicione</a> já um interessado
                      </h6>
                    </div>
                  )}
              </div>
          }
        </div>
      );
    }
  }
}

export default Index;
