import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Create from "../../Components/FichaTecnica/Interessados/Create";

class CreateInteressados extends Component {
  render() {
    return (
      <div className="createInteressados">
        <Header />
        <Create />
        <Footer />
      </div>
    );
  }
}

export default CreateInteressados;
