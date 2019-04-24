import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Index from "../../Components/FichaTecnica/Index";

class IndexFichaTecnica extends Component {
  render() {
    return (
      <div className="LoginPage">
        <Header />
        <Index />
        <Footer />
      </div>
    );
  }
}

export default IndexFichaTecnica;
