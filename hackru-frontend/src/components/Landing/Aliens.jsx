/**
 * @author Shivan Modha
 * @description Landing Page: Alien Background
 * @version 0.0.1
 * Created 12/15/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
/***************************************************************IMPORTS***************************************************************/

/****************************************************************ABOUT****************************************************************/
/**
 * Alien Background Component
 */
class Aliens extends Component {
    constructor(props) {
        super(props);
        this._event_onResize = this._event_onResize.bind(this);
        this._event_onInitializeRenderer = this._event_onInitializeRenderer.bind(this);
        this._event_onRender = this._event_onRender.bind(this);
        this._event_onUpdate = this._event_onUpdate.bind(this);
        this._event_onMouseMove = this._event_onMouseMove.bind(this);
        window.addEventListener("mousemove", this._event_onMouseMove);
        this.x = 0;
        this.y = 0;
        this.image = new Image();
        this.image.onload = this._event_onInitializeRenderer;
        this.image.src = "./assets/icons/hru-alien-noplat-white.png";
    }
    _event_onResize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
    _event_onMouseMove(e) {
        this.x = e.x;
        this.y = e.y;
    }
    _event_onInitializeRenderer() {
        this.aliens = [];
        this.canvas = document.getElementById("drawable");
        window.addEventListener("resize", this._event_onResize);
        this._event_onResize();
        this.context = this.canvas.getContext("2d");
        this.maxCount = 250;
        this.counter = this.maxCount;
        setInterval(this._event_onUpdate, 1);
        setInterval(this._event_onRender, 2);
    }
    _event_onUpdate() {
        this.counter--;
        if (this.counter <= 0) {
            let size = Math.floor(Math.random() * 50) + 50;
            if (this.aliens.length < 5) {
                this.aliens.push({
                    x: Math.floor(Math.random() * this.canvas.width) - (size / 2),
                    y: this.canvas.height,
                    width: size,
                    height: size,
                    speed: Math.floor(Math.random() * 5) + 1
                });
            }
            this.counter = this.maxCount;
        }
        for (let i = 0; i < this.aliens.length; i++) {
            let alien = this.aliens[i];
            alien.y -= alien.speed;
            if (alien.y < -400) {
                this.aliens.splice(i, 1);
                i--;
            }
        }
    }
    _event_onRender() {
        if (this.context && this.context.clearRect && this.canvas) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.aliens.length; i++) {
                let alien = this.aliens[i];
                this.context.globalAlpha = 1;
                this.context.drawImage(this.image, alien.x, alien.y, alien.width, alien.height);
                for (let j = 0; j < 100; j++) {
                    this.context.globalAlpha = 1.0 / j;
                    this.context.drawImage(this.image, alien.x, alien.y + (j * 5), alien.width, alien.height);
                }
            }
        } else {
            this.canvas = document.getElementById("drawable");
            this.context = this.canvas.getContext("2d");
        }
    }
    render() {
        return (
            <canvas id="drawable">                
            </canvas>
        )
    }
}
/****************************************************************ABOUT****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Aliens;
/***************************************************************EXPORTS***************************************************************/