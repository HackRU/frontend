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
        this.image = new Image();
        this.image.onload = this._event_onInitializeRenderer;
        this.image.src = "./assets/icons/hackethon_alien_noplat_2.png";
    }
    _event_onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    _event_onInitializeRenderer() {
        this.aliens = [];
        this.canvas = document.getElementById("drawable");
        window.addEventListener("resize", this._event_onResize);
        this._event_onResize();
        this.context = this.canvas.getContext("2d");
        this.maxCount = 500;
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
                    height: size
                });
            }
            this.counter = this.maxCount;
        }
        for (let i = 0; i < this.aliens.length; i++) {
            let alien = this.aliens[i];
            alien.y -= 1;
            if (alien.y < -400) {
                this.aliens.splice(i, 1);
                i--;
            }
        }
    }
    _event_onRender() {
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