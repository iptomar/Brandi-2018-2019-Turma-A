import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Index from "../../Components/FichaRegistoIdentificacao/Index";

class IndexFichaRI extends Component {
  render() {
    return (
      <div className="IndexFichaRIPage">
        <Header />
        <Index query={this.props.query} />
        <Footer />
      </div>
    );
  }
}

export default IndexFichaRI;
