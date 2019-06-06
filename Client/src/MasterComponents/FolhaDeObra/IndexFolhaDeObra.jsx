import React, { Component } from "react";
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";
import Index from "../../Components/FolhaDeObra/Index";

class IndexFolhaDeObra extends Component {

    render() {
        return (
            <div>
                <Header />
                <Index />
                <Footer />
            </div>
        );
    }
}

export default IndexFolhaDeObra;
