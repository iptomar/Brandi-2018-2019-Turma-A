import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../Components/Header';
import Index from '../../Components/Users/Index';
import Footer from '../../Components/Footer';

class RegisterPage extends Component {
    render() {
      return (
        <div className="RegisterPage">
          <Header/>
          <Index query={this.props.query}/>
          <Footer/>
        </div>
      );
    }
  }

export default RegisterPage;