import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SockJS from 'sockjs-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }

    //create a new socket connection
    //see documentation https://github.com/sockjs/sockjs-client#getting-started
    this.sock = new SockJS('https://chat-server.azurewebsites.net/chat');

    this.sock.onopen = () => {
      console.log('connection open');
    };

    this.sock.onmessage = e => {
      console.log('message received:', e.data);
      this.setState({ messages: [...this.state.messages, e.data] });
    };

    this.sock.onclose = () => {
      console.log('close');
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let text = this.refs.messageText.value;
    this.sock.send(text);
  }

  render() {
    let i = 0;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <div className="input-group">
                <input type="text" ref="messageText" className="form-control" placeholder="Type here to chat..." />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">Send!</button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <ul className="list-group">{
          this.state.messages.map(message => {
            return <li className="list-group-item" key={i++}>{message}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
