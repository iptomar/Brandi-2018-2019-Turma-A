import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Details from "../../Components/FichaRegistoIdentificacao/Details/Details";

class DetailsFichaTecnica extends Component {
  render() {
    return (
      <div className="DetailsRIPage">
        <Header />
        <Details id={this.props.id} query={this.props.query}/>
        <Footer />
      </div>
    );
  }
}

export default DetailsFichaTecnica;
