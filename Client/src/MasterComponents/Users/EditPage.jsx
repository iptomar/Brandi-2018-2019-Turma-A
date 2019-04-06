import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Edit from '../../Components/Users/Edit';
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";

class EditPage extends Component {
    render() {
      return (
        <div className="EditPage">
          <Header/>
          <Edit id={this.props.id}/>
          <Footer/>
        </div>
      );
    }
  }

export default EditPage;