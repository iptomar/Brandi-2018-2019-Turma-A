import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Index from "../../Components/FichaTecnica/Interessados/Index";

class IndexInteressados extends Component {
  render() {
    return (
      <div className="interessadosIndex">
        <Header />
        <Index />
        <Footer />
      </div>
    );
  }
}

export default IndexInteressados;
