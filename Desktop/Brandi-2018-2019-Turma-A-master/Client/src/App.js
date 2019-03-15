import React, { Component } from 'react';
import LoginPage from './Components/LoginPage';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage/>
      </div>
    );
  }
}

export default App;