import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Details from "../../Components/FichaTecnica/Interessados/Details/Details";

class DetailsInteressados extends Component {
  render() {
    return (
      <div className="detailsInteressados">
        <Header />
        <Details id={this.props.id}/>
        <Footer />
      </div>
    );
  }
}

export default DetailsInteressados;
