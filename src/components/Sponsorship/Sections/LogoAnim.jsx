import React, { Component } from "react";
import { Container, Col } from "reactstrap";
import { theme } from "../../../Defaults";
import anime from "animejs";

class LogoAnim extends Component {
	constructor(props) {
		super(props);
		fetch(this.props.src).then((response) => {
			response.text().then((text) => {
				this.setState({
					file: text
				}, () => {
					anime({
						targets: "path",
						strokeDashoffset: [anime.setDashoffset, 0],
						easing: "easeOutElastic",
						duration: 6500,
						direction: "alternate",
						delay: (el, i) => { return 1000; },
						loop: true
					});
				});
			});
		});
	}
	componentWillMount() {
		this.setState({
			file: ""
		});
	}
	render() {
		return (
			<Container style={{ minHeight: 210, maxWidth: 210, marginLeft: 0, marginRight: 20, borderRadius: theme["hero-border-radius"], color: theme.primary[0] + "FF" }} className="align-items-center">
				<Col xs={12} dangerouslySetInnerHTML={{ __html: this.state.file }} />
			</Container>
		);
	}
}

export default LogoAnim;
