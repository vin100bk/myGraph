import React, { Component } from 'react';

import './GraphButton.css';

class GraphButton extends Component {
    render() {
        return (
            <a href="#" className="graph-button" onClick={this.props.onClick}>
                {this.props.children}
            </a>
        );
    }
}

export default GraphButton;
