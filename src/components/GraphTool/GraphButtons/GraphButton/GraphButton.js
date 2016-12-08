import React, { Component } from 'react';

import './GraphButton.css';

class GraphButton extends Component {
    render() {
        let className = 'graph-button';
        if('className' in this.props) {
            className += ' ' + this.props.className;
        }

        return (
            <a href="#" className={className} onClick={this.props.onClick}>
                {this.props.children}
            </a>
        );
    }
}

export default GraphButton;
