import React from 'react'
import ReactCountdown from 'react-countdown-now';

const Countdown = () => (
    <ReactCountdown
        date={Date.now() + 10000}
        renderer={({ hours, minutes, seconds, completed  }) => {
            const matrix = [[], [], [], [], []]
            addNumber(matrix, hours)
            addChar(matrix, space)
            addChar(matrix, colon)
            addChar(matrix, space)
            addNumber(matrix, minutes)
            addChar(matrix, space)
            addChar(matrix, colon)
            addChar(matrix, space)
            addNumber(matrix, seconds)
            return matrix
        }}
    />
)

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

export default Countdown
