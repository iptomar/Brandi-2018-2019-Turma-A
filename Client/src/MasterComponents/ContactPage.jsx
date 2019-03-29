import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import Contacts from '../Components/Contacts';
import Footer from '../Components/Footer';

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