import React, { Component } from 'react';
import './styles/App.css';
import './styles/background.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      displayResponse: false,
      question: '',
      response: '',
      shake: false,
    }
  }

  handleChange = (event) => {
    this.setState({question: event.target.value});
  }

  getAnswer = (event) => {
    this.setState({ 
      displayResponse: false,
      shake: true
    });
    event.preventDefault();
    let params = encodeURIComponent(this.state.question);
    let query = `https://8ball.delegator.com/magic/JSON/${params}`;
    axios.get(query)
      .then(res => {
        const response = res.data.magic.answer;
        this.setState({ response });
      });
    setTimeout(
    function() {
        this.setState({ 
          displayResponse: true,
          shake: false
        });
    }
    .bind(this),
    1000
);
  }

  render() {
    const innerClasses = this.state.displayResponse ? 'answer-wrap active' : 'answer-wrap';
    const ballClasses = this.state.shake ? 'ball shake' : 'ball';

    return (
      <div className="App">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <form onSubmit={this.getAnswer}>
          <label>
            Question:
            <input type="text" name="question" placeholder="Ask your question here" onChange={this.handleChange} />
          </label>
        </form>
        <div className={ballClasses}>
          <div className={innerClasses}>
            <div className="answer">{this.state.response}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
