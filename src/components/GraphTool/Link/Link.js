import React, { Component } from 'react';

import './Link.css';

class Link extends Component {
    render() {
        const style = {
            top: this.props.link.y + 'px',
            left: this.props.link.x + 'px',
            transform: 'rotate(' + this.props.link.angle + 'rad)',
            width: this.props.link.width + 'px'
        };

        return (
            <div className="graph-line" style={style}>
                <div className="graph-line-inner"/>
            </div>
        );
    }
}

export default Link;
