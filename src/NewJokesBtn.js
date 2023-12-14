import React, { Component } from "react";
import "./NewJokesBtn.css"

class NewJokesBtn extends Component {
    constructor(props) {
        super(props);
        this.addJokes = this.addJokes.bind(this)
    }
    addJokes() {
        this.props.addJokes();
    }
    render() {
        return (
            <div className="NewJokes-cont">
                <h1>Dad <span>Jokes</span></h1>
                <div className="NewJokes-emoji">😂</div>
                <button className="NewJokes-btn" onClick={this.addJokes}>New Jokes</button>
            </div>
        )
    }
}

export default NewJokesBtn;