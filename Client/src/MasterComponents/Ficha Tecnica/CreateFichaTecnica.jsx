import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Create from "../../Components/FichaTecnica/Create";

class CreateFichaTecnica extends Component {
  render() {
    return (
      <div className="LoginPage">
        <Header />
        <Create />
        <Footer />
      </div>
    );
  }
}

export default CreateFichaTecnica;
