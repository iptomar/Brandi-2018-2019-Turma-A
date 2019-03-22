import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Read from "../../Components/FichaTecnica/Read";

class CreateFichaTecnica extends Component {
  render() {
    return (
      <div className="ReadFichaTecnica">
        <Header />
        <Read />
        <Footer />
      </div>
    );
  }
}

export default CreateFichaTecnica;
