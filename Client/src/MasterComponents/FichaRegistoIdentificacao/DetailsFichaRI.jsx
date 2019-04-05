import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Details from "../../Components/FichaRegistoIdentificacao/Details/Details";

class DetailsFichaTecnica extends Component {
  render() {
    return (
      <div className="DetailsRIPage">
        <Header />
        <Details id={this.props.id}/>
        <Footer />
      </div>
    );
  }
}

export default DetailsFichaTecnica;
