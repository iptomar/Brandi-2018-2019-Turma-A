import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Create from "../../Components/TestesSolubilizacao/Create";

class CreateTestesSolubilizacao extends Component {

    render() {
        return (
            <div>
                <Header />
                <Create id={this.props.id}/>
                <Footer />
            </div>
        );
    }
}

export default CreateTestesSolubilizacao;