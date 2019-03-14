import React, { Component } from "react";
import anime from "animejs";
import { theme } from "../Defaults";
const N = "rgba(0, 0, 0, 0)";
const C = theme.primary[0];
const BITMAP = {
    "0": [
        [C, C, C],
        [C, N, C],
        [C, N, C],
        [C, N, C],
        [C, C, C]
    ],
    "1": [
        [N, C, N],
        [N, C, N],
        [N, C, N],
        [N, C, N],
        [N, C, N]
    ],
    "2": [
        [C, C, C],
        [N, N, C],
        [C, C, C],
        [C, N, N],
        [C, C, C]
    ],
    "3": [
        [C, C, C],
        [N, N, C],
        [C, C, C],
        [N, N, C],
        [C, C, C]
    ],
    "4": [
        [C, N, C],
        [C, N, C],
        [C, C, C],
        [N, N, C],
        [N, N, C]
    ],
    "5": [
        [C, C, C],
        [C, N, N],
        [C, C, C],
        [N, N, C],
        [C, C, C]
    ],
    "6": [
        [C, C, C],
        [C, N, N],
        [C, C, C],
        [C, N, C],
        [C, C, C]
    ],
    "7": [
        [C, C, C],
        [N, N, C],
        [N, N, C],
        [N, N, C],
        [N, N, C]
    ],
    "8": [
        [C, C, C],
        [C, N, C],
        [C, C, C],
        [C, N, C],
        [C, C, C]
    ],
    "9": [
        [C, C, C],
        [C, N, C],
        [C, C, C],
        [N, N, C],
        [C, C, C]
    ],
    ":": [
        [N, N, N],
        [N, C, N],
        [N, N, N],
        [N, C, N],
        [N, N, N]
    ],
    "H": [
        [C, N, C],
        [C, N, C],
        [C, C, C],
        [C, N, C],
        [C, N, C]
    ],
    "A": [
        [C, C, C],
        [C, N, C],
        [C, C, C],
        [C, N, C],
        [C, N, C]
    ],
    "C": [
        [C, C, C],
        [C, N, N],
        [C, N, N],
        [C, N, N],
        [C, C, C]
    ],
    "K": [
        [C, N, C],
        [C, N, C],
        [C, C, N],
        [C, N, C],
        [C, N, C]
    ],
    " ": [
        [N],
        [N],
        [N],
        [N],
        [N]
    ],
    "R": [
        [C, C, C],
        [C, N, C],
        [C, C, N],
        [C, N, C],
        [C, N, C]
    ],
    "U": [
        [C, N, C],
        [C, N, C],
        [C, N, C],
        [C, N, C],
        [C, C, C]
    ],
    "W": [
        [C, N, C, N, C],
        [C, N, C, N, C],
        [C, N, C, N, C],
        [C, N, C, N, C],
        [N, C, N, C, N]
    ],
    "I": [
        [C, C, C],
        [N, C, N],
        [N, C, N],
        [N, C, N],
        [C, C, C]
    ],
    "L": [
        [C, N, N],
        [C, N, N],
        [C, N, N],
        [C, N, N],
        [C, C, C]
    ],
    "T": [
        [C, C, C],
        [N, C, N],
        [N, C, N],
        [N, C, N],
        [N, C, N]
    ],
    "E": [
        [C, C, C],
        [C, N, N],
        [C, C, N],
        [C, N, N],
        [C, C, C]
    ],
    "N": [
        [C, N, N, C],
        [C, C, N, C],
        [C, C, C, C],
        [C, N, C, C],
        [C, N, N, C]
    ],
}
class AnimatedGrid extends Component {
    constructor() {
        super();
        this.animate = this.animate.bind(this);
    }
    animate() {
        let rows = (this.props.rows) ? (this.props.rows) : 25;
        let cols = (this.props.cols) ? (this.props.cols) : 25;
        anime({
            targets: ".staggering .element",
            scale: [
                {value: .1, easing: "easeOutSine", duration: 500},
                {value: 1, easing: "easeInOutQuad", duration: 1200}
            ],
            delay: anime.stagger(200, {grid: [cols, rows], from: 'center'}),
        });
    }
    componentDidMount() {
        this.animate();
    }
    render() {
        let grid = [];
        let width = (this.props.width) ? (this.props.width) : 500;
        let height = (this.props.height) ? (this.props.height) : 500;
        let rows = (this.props.rows) ? (this.props.rows) : 25;
        let cols = (this.props.cols) ? (this.props.cols) : 25;
        let cellWidth = width / cols;
        let cellHeight = height / cols;
        let padding = (this.props.padding) ? (this.props.padding) : 2;
        let template = this.props.template;
        if (!template) {
            template = [];
            for (let i = 0; i < rows; i++) {
                let col = [];
                for (let j = 0; j < cols; j++) {
                    col.push(0);
                }
                template.push(col);
            }
        }
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let color = (y < template.length && x < template[0].length && template[y][x]) ? (template[y][x]) : ("rgba(0, 0, 0, 0)")
                grid.push(<div key={(y * cols) + x} className="element" style={{ position: "absolute", width: cellWidth, height: cellHeight, minWidth: cellWidth, minHeight: cellHeight, backgroundColor: color, top: y * (cellHeight + padding), left: x * (cellWidth + padding) }} ></div>)
            }
        }
        return (
            <div className="staggering">
                {grid}
            </div>
        )
    }
}
class TextGrid extends Component {
    constructor() {
        super();
        this.generateTemplate = this.generateTemplate.bind(this);
    }
    componentWillMount() {
        this.setState({
            template: this.generateTemplate(this.props.text)
        });
    }
    generateTemplate(str) {
        let template = [];
        for (let i = 0; i < 10; i++) {
            template.push([]);
        }
        for (let i = 0; i < str.length; i++) {
            let BIT = BITMAP[str.charAt(i)];
            for (let j = 0; j < BIT.length; j++) {
                template[j].push(...BIT[j]);
                template[j].push(N);
            }
        }
        return template;
    }
    render() {
        return (
            <AnimatedGrid padding={0} ref="grid" width={500} height={500} rows={10} cols={70} template={this.state.template} />
        );
    }

}
export default AnimatedGrid
export {
    BITMAP, N, C, TextGrid
}