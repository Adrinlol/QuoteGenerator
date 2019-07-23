import React, { Component, Fragment } from 'react';
import '../App.css';

class Quote extends Component {
    state = {
        apiFetch: null,
        author: '',
        text: '',
        isLoaded: false
    }; 
    
    componentDidMount = () => {
        // Fetch the quotes from freecodecamp
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
            headers: {
                Accept: "application/json",
            }
        })
            // Parse the response    as JSON
            .then(response => response.json())
            .then((responseData) => {
                // Update the initial state
                this.setState({
                    apiFetch: responseData.quotes,
                    author: responseData.quotes[0].author,
                    text: responseData.quotes[0].quote,
                    isLoaded: true
                });
            })
            // Catch an error
            .catch(error => this.setState({ error }));
    };

    // Generate random quote
    getTheQuote = () => {
        const quotes = this.state.apiFetch;
        const updatedQuotes = [];
        const randomNumber = Math.floor((Math.random() * this.state.apiFetch.length));

        quotes.map((element, index) => 
            // Get the quote with using random number
            index === randomNumber ?
                updatedQuotes.push(element) 
                : this.state.error
        );

        // Update the state 
        this.setState({
            text: updatedQuotes[0].quote,
            author: updatedQuotes[0].author
        })
    };

    // Share the quote on twitter
    shareTheQuote = () => {
        const url = "twitter.com";
        const text = `${this.state.author} - ${this.state.text}`
        window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    }

    render () {
        return (
            <Fragment>
                <div id="container">
                    <h1 id="title">Quote Generator</h1>
                    <div id="quote">
                        <p id="text">{this.state.text}</p>
                        <p id="author">{this.state.author}</p>
                        <button id="tweet"onClick={this.shareTheQuote}>Tweet</button>
                        <button id="new-quote"onClick={this.getTheQuote}>New Quote</button>
                    </div>
                </div>
            </Fragment>
        );
    }
};

export default Quote;