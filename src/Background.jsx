import React from "react"; // Default react imports for the component
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const imageDefs = [
    {
        source: "/assets/background/line_green.svg",
        bottom: -300,
        right: -300,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/line_yellow.svg",
        bottom: -250,
        right: -350,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/line_red.svg",
        bottom: -200,
        right: -400,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/circle_red.svg",
        bottom: -100,
        right: -200,
        height: 400,
        opacity: 1,
    }, //END BOTTOM RIGHT SECTION
    {
        source: "/assets/background/line_green.svg",
        top: -250,
        left: -400,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/line_yellow.svg",
        top: -200,
        left: -500,
        height: 750,
        opacity: 1,
    },
    {
        source: "/assets/background/target-thick_green.svg",
        top: 175,
        left: -200,
        height: 400,
        opacity: 1,
    },
    {
        source: "/assets/background/line_red.svg",
        top: -150,
        left: -300,
        height: 750,
        opacity: 1,
    }, //END TOP LEFT SECTION
];

export default function Background(props) {
    const renderImage = (icon, top, left, bottom, right, height, transform, multiplier, opacity) => {
        let style = { position: "fixed" };
        style["top"] = top ? top : null;
        style["left"] = left ? left : null;
        style["bottom"] = bottom ? bottom : null;
        style["right"] = right ? right : null;
        style["transform"] = transform ? transform : null;
        style["opacity"] = opacity ? opacity : 0.25;
        return (
            <div style={style}>
                <img alt={icon.split("/").pop()}
                    src={icon}
                    height={height} />
            </div>
        );
    }
    const images = [];
    for (let i = 0; i < imageDefs.length; i++) {
        {
            let image = imageDefs[i];
            images.push(renderImage(
                image.source,
                image.top,
                image.left,
                image.bottom,
                image.right,
                image.height,
                image.transform,
                image.multiplier ? 1 - image.multiplier : 1,
                image.opacity
            ));
        }
    };
    return (
        <Grid container
            justify="space-between">
            <Grid md 
                item container justify="center" style={{ position: "fixed" }}>
                <Grid item 
                    sm={2} md={2} lg={1} style={{ transform: "rotate(45deg)", height: "100vh", backgroundColor: "rgb(79, 171, 95)" }}>

                </Grid>
                <Grid item 
                    sm={2} md={2} lg={1} style={{ transform: "rotate(45deg)", height: "100vh", backgroundColor: "rgb(241, 186, 67)" }}>

                </Grid>
                <Grid item 
                    sm={2} md={2} lg={1} style={{ transform: "rotate(45deg)", height: "100vh", backgroundColor: "rgb(200, 81, 81)" }}>

                </Grid>
            </Grid>
            {images}
        </Grid>
    );

};
