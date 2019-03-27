import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Details from "../../Components/FichaRegistoIdentificacao/Details";

class DetailsFichaTecnica extends Component {
  render() {
    return (
      <div className="LoginPage">
        <Header />
        <Details />
        <Footer />
      </div>
    );
  }
}

export default DetailsFichaTecnica;
