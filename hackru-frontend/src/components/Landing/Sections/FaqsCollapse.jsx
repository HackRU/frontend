import React from 'react';
import { Collapse } from 'reactstrap';
import { Icon } from "react-fa";

class FaqsCollapse extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
  render() {
    const cat = this.props.cat;

    return (
        <div>
          <strong><h3 className="theme-font" onClick={this.toggle}>
            {cat.title}
            <Icon className="pull-right" name={(this.state.collapse) ? ("chevron-up") : ("chevron-down")} />
          </h3></strong>
          <hr />
          <Collapse className="mb-3" isOpen={this.state.collapse}>{cat.text}</Collapse>
        </div>
    );
  }
}

export default FaqsCollapse