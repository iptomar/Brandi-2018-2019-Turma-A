import React, { Component } from "react";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
            alertisNotVisible: true,
            alertColor: "danger",
            data: [],
        }
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
                    //console.log(this.alertText)
            }
        });
    }


    render() {
        //Verifica se existe o token
        if (sessionStorage.getItem('token') == null) {
            window.location = '/';
        } else {
            //let href = "/Interessados/" + this.props.id;
            return (
                <div className="Inicio container">
                    <div className="container">
                        <div className="py-3 text-center">
                            <div className="row">
                                <h2 className="col-md-10">Detalhes </h2>
                                <div className="col-md-2">
                                    <a href={`/interessados/${this.props.id}/editar`} className="mt-3 btn btn-warning btn-block">
                                        <i className="fas fa-edit"></i> Editar
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label>Nome</label>
                                <input type="text" className="form-control" id="nomeInteressado" placeholder={this.state.data.nome} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Endereço Postal</label>
                                <input type="text" className="form-control" id="endPostal" placeholder={this.state.data.enderecoPostal} readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="text" className="form-control" id="email" placeholder={this.state.data.email} readOnly />
                            </div>
                            <div className="col-md-12 mb-3">
                            <label>Tipo</label>
                                <select id="DDLTipo" className="form-control" disabled>
                                    <option className="dropdown-item">
                                        {this.state.data.tipo}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <br />
                    </div>
                </div>


            );

        }
    }
}


export default Details;