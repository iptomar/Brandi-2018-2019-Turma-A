import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import DetailsEdit from "../../Components/FichaTecnica/DetailsEdit";

class DetailsEditFichaTecnica extends Component {
  render() {
    return (
      <div className="LoginPage">
        <Header />
        <DetailsEdit id={this.props.id} query={this.props.query}/>
        <Footer />
      </div>
    );
  }
}

export default DetailsEditFichaTecnica;
