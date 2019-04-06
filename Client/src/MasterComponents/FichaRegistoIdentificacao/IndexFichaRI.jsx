import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
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
