import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Globais/Header';
import Contacts from '../Components/Outros/Contacts';
import Footer from '../Components/Globais/Footer';

class ContactPage extends Component {
    render() {
      return (
        <div className="RegisterPage">
          <Header/>
          <Contacts/>
          <Footer/>
        </div>
      );
    }
  }

export default ContactPage;