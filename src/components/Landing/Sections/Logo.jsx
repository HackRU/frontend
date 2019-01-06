/**
 * @author Shivan Modha
 * @description Landing Page: Home Component
 * @version 0.0.1
 * Created 12/27/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Col } from "reactstrap";
import { theme } from "../../../Defaults";
import anime from "animejs";
/***************************************************************IMPORTS***************************************************************/

/****************************************************************LOGO*****************************************************************/
/**
 * Home component for the landing page
 */
class Logo extends Component {
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
						easing: "easeInOutExpo",
						duration: 7500,
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
			<Container style={{ minHeight: theme["hero-height"], maxWidth: theme["hero-width"], background: (this.props.noCircle) ? ("") : (theme["hero-background"]), borderRadius: theme["hero-border-radius"], color: theme.primary[0] + "AF" }} className="d-flex align-items-center">
				<Col xs={12} dangerouslySetInnerHTML={{ __html: this.state.file }} />
			</Container>
		);
	}
}
/****************************************************************LOGO*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Logo;
/***************************************************************EXPORTS***************************************************************/