import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Globais/Header';
import About from '../Components/Outros/About';
import Footer from '../Components/Globais/Footer';

class AboutPage extends Component {
    render() {
      return (
        <div>
          <Header/>
          <About/>
          <Footer/>
        </div>
      );
    }
  }

export default AboutPage;