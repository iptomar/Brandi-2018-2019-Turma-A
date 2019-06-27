import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Edit from "../../Components/TestesSolubilizacao/Details/Edit";

class EditTestesSolubilizacao extends Component {

    render() {
        return (
            <div>
                <Header />
                <Edit id={this.props.id}/>
                <Footer />
            </div>
        );
    }
}

export default EditTestesSolubilizacao;