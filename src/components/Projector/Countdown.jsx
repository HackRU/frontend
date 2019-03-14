import React, { Component } from "react";
import AnimatedGrid, { BITMAP, N } from "../AnimatedGrid";
class Countdown extends Component {
    constructor() {
        super();
        this.getTimeString = this.getTimeString.bind(this);
        this.generateTemplate = this.generateTemplate.bind(this);
    }
    componentWillMount() {
        let end = new Date(2019, 3, 10, 12, 30, 0, 0);
        this.oldMin = -1;
        this.setState({
            end: end,
            template: this.generateTemplate(this.getTimeString(end))
        });
        setInterval(() => {
            this.setState({
                template: this.generateTemplate(this.getTimeString(this.state.end))
            });
        }, 1000);
    }
    getTimeString(end) {
        let now = new Date().getTime();
        let distance = end - now;
        //let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (hours < 0) {
            hours = 0;
        }
        if (minutes < 0) {
            minutes = 0;
        }
        if (seconds < 0) {
            seconds = 0;
        }
        hours = hours + "";
        if (hours.length === 1) {
            hours = "0" + hours;
        }
        if (seconds !== this.oldMin) {
            if (this.oldMin !== -1 && seconds === 2) {
                this.refs.grid.animate();
            }
            this.oldMin = seconds;
        }
        minutes = minutes + "";
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        seconds = seconds + "";
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }
        return hours + ":" + minutes + ":" + seconds;
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
            <AnimatedGrid padding={0} ref="grid" width={500} height={500} rows={10} cols={32} template={this.state.template} />
        );
    }
}
export default Countdown;
