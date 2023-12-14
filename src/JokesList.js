import React, { Component } from "react";
import Joke from "./Joke";
import NewJokesBtn from './NewJokesBtn';

import axios from "axios";
import "./JokeList.css"

const API_URL = 'https://icanhazdadjoke.com/'
const num = 9

class JokesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokesList: [],
            parsedList: JSON.parse(localStorage.getItem('jokesList')),
            isLoading: false
        }
        this.addOne = this.addOne.bind(this)
        this.leftOne = this.leftOne.bind(this)
        this.addJokes = this.addJokes.bind(this)
    }
    async componentDidMount() {
        let response;
        let count = 0
        if (this.state.parsedList.length === 0) {
            while (this.state.jokesList.length < num) {
                count += 1;
                console.log(`start lenght of list: ${this.state.jokesList.length}`)
                response = await axios.get(API_URL, {
                    headers: { Accept: 'application/json' }
                })
                let data;
                if (count >= 2) {
                    let isInList = this.state.jokesList.find(item => item.id === response.data.id)
                    if (isInList === undefined) {
                        console.log(`added item! lenght of list: ${this.state.jokesList.length}`)

                        data = { ...response.data, count: 0 }
                        this.setState(st => ({
                            jokesList: [...st.jokesList, data]
                        }))

                    } else {
                        console.log('same ID!!!')
                    }


                }
                else {
                    data = { ...response.data, count: 0 }
                    this.setState(st => ({
                        jokesList: [...st.jokesList, data]
                    }))
                }

            }
            localStorage.setItem('jokesList', JSON.stringify(this.state.jokesList))
            this.setState({ parsedList: JSON.parse(localStorage.getItem('jokesList')) })





        } else {
            this.setState({ jokesList: this.state.parsedList })
        }


    }



    addOne(idx) {

        let newArr = this.state.jokesList.map((m, i) => {

            if (idx === m.id) {
                return { ...m, count: m.count + 1 }
            } else {
                return m
            }
        })

        //Sort Array from biggest to smallest
        newArr.sort((a, b) => {
            return b.count - a.count;
        })


        localStorage.setItem('jokesList', JSON.stringify(newArr))

        this.setState({ jokesList: newArr, parsedList: JSON.parse(localStorage.getItem('jokesList')) })

    }



    leftOne(idx) {
        let newArr = this.state.jokesList.map((m, i) => {

            if (idx === m.id) {
                return { ...m, count: m.count - 1 }
            } else {
                return m
            }
        })

        //Sort Array from biggest to smallest
        newArr.sort((a, b) => {
            return b.count - a.count;
        })


        localStorage.setItem('jokesList', JSON.stringify(newArr))

        this.setState({ jokesList: newArr, parsedList: JSON.parse(localStorage.getItem('jokesList')) })
    }

    async addJokes() {
        this.setState({ isLoading: true })
        setTimeout(() => {
            this.setState({ isLoading: false })
        }
            , 3000)
        let response;
        let round = this.state.jokesList.length + num

        while (this.state.jokesList.length < round) {
            response = await axios.get(API_URL, {
                headers: { Accept: 'application/json' }
            })
            let isInList = this.state.jokesList.find(item => item.id === response.data.id)
            if (isInList === undefined) {
                console.log(`Added item! lenght of list: ${this.state.jokesList.length}`)
                let data = { ...response.data, count: 0 }

                this.setState(st => ({
                    jokesList: [...st.jokesList, data]
                }))
            } else {
                console.log('same ID!!!')
            }

        }

        localStorage.setItem('jokesList', JSON.stringify(this.state.jokesList))
        this.setState({ parsedList: JSON.parse(localStorage.getItem('jokesList')), isLoading: false })


    }


    render() {
        let load = this.state.isLoading ? <div className="🤚">
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="🌴"></div>
            <div className="👍"></div>
        </div> :
            <div className="JokeList-main">
                <NewJokesBtn addJokes={this.addJokes} />
                <div className="JokeList-cont">
                    {this.state.parsedList.map(m => <Joke
                        key={m.id}
                        id={m.id}
                        joke={m.joke}
                        count={m.count}
                        addOne={this.addOne}
                        leftOne={this.leftOne}
                    />)}
                </div>
            </div>


        return (
            <div>{load}</div>

        )
    }
}

export default JokesList;