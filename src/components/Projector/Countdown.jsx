import React, { Component } from "react";
import anime from "animejs";

const addNumber = (matrix, num) => {
    addChar(matrix, numbers[num / 10])
    addChar(matrix, space)
    addChar(matrix, numbers[num % 10])
}

const addChar = (matrix, character) => {
    for(let i = 0; i < matrix.length; i++) {
        matrix[i] = matrix[i].concat(character[i])
        for(let j = 0; j < matrix[i].length; j++) {
            matrix[i].push(character[i][j])
        }
    }
}

const numbers = [
    [
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 0, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 0, 1, 0 ],
        [ 1, 1, 0 ],
        [ 0, 1, 0 ],
        [ 0, 1, 0 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 1, 1, 1 ],
        [ 1, 0, 0 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 1, 0, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 0, 0, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 1, 0, 0 ],
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 1, 0, 0 ],
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 0, 0, 1 ],
        [ 0, 0, 1 ],
        [ 0, 0, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 1 ],
    ],
    [
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 1 ],
        [ 0, 0, 1 ],
        [ 1, 1, 1 ],
    ]
]

const colon = [
    [ 0 ],
    [ 1 ],
    [ 0 ],
    [ 1 ],
    [ 0 ],
]

const space = [
    [ 0 ],
    [ 0 ],
    [ 0 ],
    [ 0 ],
    [ 0 ],
]
class Countdown extends Component {
    componentWillMount() {
        anime({
            targets: ".staggering .el",
            scale: [
                {value: .1, easing: 'easeOutSine', duration: 500},
                {value: 1, easing: 'easeInOutQuad', duration: 1200}
            ],
            delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
        });
    }
    render() {
        return (
            <div className="staggering">
                
            </div>
        )
    }
}
export default Countdown