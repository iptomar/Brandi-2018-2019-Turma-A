import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../Components/Header';
import Details from '../../Components/Users/Details';
import Footer from '../../Components/Footer';

class DetailsUserPage extends Component {
    render() {
      return (
        <div className="EditPage">
          <Header/>
          <Details id={this.props.id}/>
          <Footer/>
        </div>
      );
    }
  }

export default DetailsUserPage;