import React, { Component } from "react";
import { theme } from "../../../../Defaults.js";
import SponsorItem from "./SponsorItem.jsx";
import { Container, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import PropTypes from "prop-types";

class CarouselContainer extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.declaration)
        this.state = {
            activeIndex: 0,
            animating: false
        }
    }

    next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.declaration.children.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex
        })
    }
    
    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.declaration.children.length - 1 : this.state.activeIndex - 1;
        this.setState({
            activeIndex: nextIndex
        })
    }

    goToIndex = (index) => {
        if (this.animating) return;
        this.setState({
            activeIndex: index
        })
    }

    render() {
        let { declaration } = this.props;
        let sponsors = [];
        for (let i = 0; i < declaration.children.length; i++) {
            //console.log(declaration.baseURL);
            sponsors.push(
            <CarouselItem
                onExiting={() => this.setState({ animating:true })}
                onExited={() => this.setState({ animating:false })}
                key={i}>
                    <div style={{ float: "none",  maxWidth: this.props.declaration.size.width, maxHeight: this.props.declaration.size.height }}>
                        <a href={declaration.children[i].url} className="text-center"><img alt={this.props.name}
                            className="sponsor-item-image"
                            src={this.props.baseURL + "logos/" + `${declaration.root}${declaration.children[i].image}`}/></a>
                    </div>
            </CarouselItem>);
        }
        console.log(declaration.size.width + " " + declaration.size.height);
        return (
            <Container fluid
                style={{ textAlign: "center" }}>
                { this.props.showName &&
                    <Row style={{ width: "100%" }}
                        className="d-flex align-items-center">
                        <Col xs={12}>
                            <h2 className="display-4"
                                style={{ color: theme[declaration.color] }}>
                                {declaration.name}
                            </h2>
                        </Col>
                    </Row>}
                <Carousel
                    style={{ position: "relative", float: "none", width: "100%", height: this.props.declaration.size.height + " !important" }}
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}>
                    <CarouselIndicators items={sponsors} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex}/>
                    {sponsors}
                </Carousel>
            </Container>
        );
    }
}

CarouselContainer.propTypes = {
    declaration: PropTypes.object,
    baseURL: PropTypes.string,
    showName: PropTypes.bool
};

export default CarouselContainer;
