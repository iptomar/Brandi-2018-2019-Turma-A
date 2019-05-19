import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Edit from "../../Components/FichaTecnica/Interessados/Details/Edit";

class EditInteressados extends Component {
  render() {
    return (
      <div className="editInteressados">
        <Header />
        <Edit id={this.props.id} />
        <Footer />
      </div>
    );
  }
}

export default EditInteressados;
