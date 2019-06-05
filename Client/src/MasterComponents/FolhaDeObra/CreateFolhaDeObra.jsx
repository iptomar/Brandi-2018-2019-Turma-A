import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Create from "../../Components/FolhaDeObra/Create";

class CreateFolhaDeObra extends Component {

    render() {
        return (
            <div>
                <Header />
                <Create />
                <Footer />
            </div>
        );
    }
}

export default CreateFolhaDeObra;