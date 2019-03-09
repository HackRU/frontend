import React, { Component } from "react";
import anime from "animejs";
class Countdown extends Component {
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
export default Countdown