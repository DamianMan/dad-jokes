import React, { Component } from "react";
import "./Joke.css"

const emojisPos = ['😕', '🙂', '😃', '😁', '🤣']
const emojiNeg = ['😕', '🤨', '😣', '😖', '😩']

class Joke extends Component {
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this)
        this.leftOne = this.leftOne.bind(this)
    }

    addOne() {
        this.props.addOne(this.props.id);
    }


    leftOne() {
        this.props.leftOne(this.props.id);
    }

    render() {
        const { count } = this.props
        let happyEmoji;
        if (count >= 2 && count < 4) happyEmoji = emojisPos[1]
        if (count >= 4 && count < 7) happyEmoji = emojisPos[2]
        if (count >= 7 && count < 12) happyEmoji = emojisPos[3]
        if (count >= 12 && count < 16) happyEmoji = emojisPos[4]
        if (count >= 16) happyEmoji = emojisPos[4]

        let unHappyEmoji;
        if (count <= -2 && count > -4) happyEmoji = emojiNeg[1]
        if (count <= -4 && count > -7) happyEmoji = emojiNeg[2]
        if (count <= -7 && count > -12) happyEmoji = emojiNeg[3]
        if (count <= -12 && count > -16) happyEmoji = emojiNeg[4]
        if (count <= -16) happyEmoji = emojiNeg[4]

        let style;
        if (count >= 2 && count < 4) style = { border: '3px solid orange' }
        if (count >= 4 && count < 7) style = { border: '3px solid #F8DE22' }
        if (count >= 7 && count < 12) style = { border: '3px solid #c5f7ae' }
        if (count >= 12) style = { border: '3px solid #3dc901' }




        return (
            <div className="Joke">
                <div className="Joke-btns">
                    <div className="Joke-arrow">
                        <i className="fa-solid fa-up-long" onClick={this.addOne}></i>
                    </div>
                    <div className="Joke-count" style={style}>{this.props.count}</div>
                    <div className="Joke-arrow">
                        <i className="fa-solid fa-down-long" onClick={this.leftOne}></i>
                    </div>
                </div>

                <div className="Joke-text-row">
                    <p className="Joke-text">{this.props.joke}</p>

                </div>
                <div className="Joke-emoji"><p>{happyEmoji || emojisPos[0] || unHappyEmoji}</p></div>

            </div>
        )
    }
}

export default Joke;