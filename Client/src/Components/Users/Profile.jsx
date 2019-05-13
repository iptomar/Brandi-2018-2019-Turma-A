import React, { Component } from "react";
import '../../CssComponents/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      data: [],
    };
  }

  componentDidMount() {
    var name = sessionStorage.getItem('id');
    this.getUser(name);
  }
  
  async getUser(id) {
    //Enviar pedido
    const response = await fetch(`/api/users/${id}`, {
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
        console.log(resp.resposta);
          this.setState({ data: resp.resposta });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

  render() {
    let getThis = this;
    return (
      <div className="container">
        <h3>User Profile</h3>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="profile__avatar">
                  <img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Users-User-Male-2-icon.png" alt="...">
                  </img>
                </div>
                <div className="profile__header">
                  <h4>{getThis.state.data.login}</h4>
                  <p className="text-muted">
                    Descrição do Utilizador
              </p>
              <br/>
                </div>
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">User info</h4>
              </div>
              <div className="panel-body">
                <table className="table profile__table">
                  <tbody>
                    <tr>
                      <th><strong>Email</strong></th>
                      <td>{this.state.data.email}</td>
                    </tr>
                    <tr>
                      <th><strong>Informação 2</strong></th>
                      <td>(..........)</td>
                    </tr>
                    <tr>
                      <th><strong>Informação 3</strong></th>
                      <td>(..........)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

              {/* <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Community</h4>
                </div>
                <div className="panel-body">
                  <table className="table profile__table">
                    <tbody>
                      <tr>
                        <th><strong>Comments</strong></th>
                        <td>58584</td>
                      </tr>
                      <tr>
                        <th><strong>Member since</strong></th>
                        <td>Jan 01, 2016</td>
                      </tr>
                      <tr>
                        <th><strong>Last login</strong></th>
                        <td>1 day ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}


          </div>
          <div className="col-xs-12 col-sm-3">
            <h3>
              Contactos
            </h3>

              <div className="profile__contact-info">
                <div className="profile__contact-info-item">
                  <div className="profile__contact-info-icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="profile__contact-info-body">
                    <h5 className="profile__contact-info-heading">Work number</h5>
                    (000)987-65-43
            </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
