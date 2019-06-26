import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Details from "../../Components/TestesSolubilizacao/Details/Read";

class DetailsTestesSolubilizacao extends Component {

    render() {
        return (
            <div>
                <Header />
                <Details id={this.props.id}/>
                <Footer />
            </div>
        );
    }
}

export default DetailsTestesSolubilizacao;