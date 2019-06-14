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
    };
  }

  componentDidMount() {
    this.getTesteSolub(this.props.id);
  }


  async getTesteSolub(id) {

    //Enviar pedido
    const response = await fetch(`/api/testesSolubilizacao/${this.props.id}`, {
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

  render() {
    let getThis = this;
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (!this.state.loading) {
        return (
            <div className="container mb-4">
                <div className="pt-3 py-3 text-center">
                    <h2>Testes de Solventes</h2>
                    <h5>Teste de eficácia dos solventes na limpeza e solubilização de estratos e sujidades</h5>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Identificação do Estrato / Sujidade</label>
                        <input type="text" className="form-control mb-3 input" id="idEstratoSujidade" 
                         value={this.state.data.idEstratoSujidade} />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label>Características</label>
                        <input type="text" className="form-control mb-3 input" id="caracteristicas" 
                         value={this.state.data.caracteristicas} />
                    </div>
                </div>
                {/* em falta: tabela de solventes e os graus de eficácia */}
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