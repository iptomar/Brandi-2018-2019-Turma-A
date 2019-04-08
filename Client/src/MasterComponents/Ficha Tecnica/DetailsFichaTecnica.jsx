import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Details from "../../Components/FichaTecnica/Details/Details";

class DetailsFichaTecnica extends Component {
  render() {
    return (
      <div className="ReadFichaTecnica">
        <Header />
        <Details />
        <Footer />
      </div>
    );
  }
}

export default DetailsFichaTecnica;
