import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import About from '../Components/About';
import Footer from '../Components/Footer';

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