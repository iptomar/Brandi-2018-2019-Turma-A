import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Create from "../../Components/FichaRegistoIdentificacao/Create";

class CreateFichaTecnica extends Component {
  render() {
    return (
      <div className="CreateRIPage">
        <Header />
        <Create/>
        <Footer />
      </div>
    );
  }
}

export default CreateFichaTecnica;
