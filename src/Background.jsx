import React from "react"; // Default react imports for the component
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles'

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
const useStyles = makeStyles(theme => ({
}))
export default function Background(props) {
    // <img src={imageDefs[0].source} style={{ height: imageDefs[0].height }} />
    const classes = useStyles();
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
    const leftImages = []
    for (let i = 4; i < imageDefs.length; i++) {
        {
            let image = imageDefs[i];
            leftImages.push(renderImage(
                image.source,
                image.top,
                image.left,
                image.bottom,
                image.right,
                image.height,
                image.transform,
                image.multiplier ? 1 - image.multiplier : 1,
                0.5
            ))
        }
    }
    const rightImages = []
    for (let i = 0; i < 4; i++) {
        {
            let image = imageDefs[i];
            leftImages.push(renderImage(
                image.source,
                image.top,
                image.left,
                image.bottom,
                image.right,
                image.height,
                image.transform,
                image.multiplier ? 1 - image.multiplier : 1,
                0.5
            ))
        }
    }
    return (
        <Grid container justify="space-between">
            <Grid md item className={classes.leftContent}>
                {leftImages}
            </Grid>
            <Grid md item>
                {rightImages}
            </Grid>
        </Grid>
    )

}
