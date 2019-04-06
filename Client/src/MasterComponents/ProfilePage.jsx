import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Globais/Header';
import Profile from '../Components/Users/Profile';
import Footer from '../Components/Globais/Footer';

class ProfilePage extends Component {
    render() {
      return (
        <div className="RegisterPage">
          <Header/>
          <Profile/>
          <Footer/>
        </div>
      );
    }
  }

export default ProfilePage;