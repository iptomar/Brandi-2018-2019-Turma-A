import React, { Component } from "react";
import AlertMsg from '../../../Globais/AlertMsg';
import LoadingAnimation from '../../../Globais/LoadingAnimation';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger",
      data: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToIndex = this.redirectToIndex.bind(this);
  }

  componentDidMount() {
    this.getInteressado(this.props.id);
  }

  async getInteressado(id) {
    //Enviar pedido
    const response = await fetch(`/api/interessados/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          break;
        default:
          break;
      }
    });
  }

  // Controla as alterações nos inputs (Necessidade do React)
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  }

  handleSubmit = async e => {
    e.preventDefault();

    //Armazenar o valor selecionado na dropdownlist
    var select = document.getElementById("DDLTipo");
    var option = select.options[select.selectedIndex];
    var tipo = option.text;
    //console.log(option);
    let nome = this.state.data.nome;
    let email = this.state.data.email;
    let endPostal = this.state.data.enderecoPostal;

    if (nome === "" || email === "" || tipo === "" || endPostal === "") {
      this.setState({
        alertText: "É necessário preencher todos os campos!",
        alertisNotVisible: false,
        alertColor: "danger"
      });
      return;
    }

    //Enviar pedidos (FORMA UTILIZADA A PEDIDO DA EQUIPA DA API)
    const response = await fetch(`/api/interessados/${this.props.id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        "nome": nome,
        "email": email,
        "tipo": tipo,
        "enderecoPostal": endPostal
      })
    });

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "NotUpdated":
          this.setState({
            alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
            alertisNotVisible: false,
            alertColor: "danger"
          });
          break;
        case "Updated":
          window.location = '/interessados';
          break;
        default:
          this.setState({
            alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
            alertisNotVisible: false,
            alertColor: "danger"
          });
          break;
      }
    });
  }

  redirectToIndex = () => {
    window.location = '/interessados';
  };

  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem('token') == null) {
      window.location = '/';
    } else {
      if (this.state.data !== null) {
        return (
          <div className="Inicio container">
            <div className="container">
              <div className="py-3 text-center">
                <h2>Interessados</h2>
              </div>
              <div className="row">
                <div className="col-md-12 order-md-1">
                  <form onSubmit={this.handleSubmit} id="formSubmit">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nomeInteressadoInput"
                          placeholder="Nome do interessado"
                          name="nome"
                          value={this.state.data.nome}
                          onChange={this.handleChange}
                          required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Endereço Postal</label>
                        <input
                          type="text"
                          className="form-control"
                          id="endPostalInput"
                          placeholder="Endereço Postal"
                          name="enderecoPostal"
                          value={this.state.data.enderecoPostal}
                          onChange={this.handleChange}
                          required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="emailInput"
                          placeholder="Email do interessado"
                          name="email"
                          value={this.state.data.email}
                          onChange={this.handleChange}
                          required />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Tipo</label>
                        <select id="DDLTipo" className="form-control mb-4">
                          <option className="dropdown-item" value="Proprietário">Proprietário</option>
                          <option className="dropdown-item" value="Dono da Obra">Dono da Obra</option>
                          <option className="dropdown-item" value="Mecenas">Mecenas</option>
                        </select>
                      </div>
                    </div>
                    <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} status={this.changeStatus} />
                    <hr className="mb-4" />
                    <div className="row">
                      <div className="col-md-6">
                        <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Editar</button>
                      </div>
                      <div className="col-md-6">
                        <button className="btn btn-secondary btn-lg btn-block mb-5" onClick={this.redirectToIndex}>Cancelar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            {this.state.showAlert ?
              <AlertMsg text={this.state.alert.text} isNotVisible={this.state.alert.notVisible} alertColor={this.state.alert.color} />
              :
              <LoadingAnimation />
            }
          </div>
        );
      }
    }
  }
}

export default Edit;