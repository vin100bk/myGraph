import React, { Component } from 'react';

import './Point.css';

class Point extends Component {
    render() {
        const style = {
            top: this.props.point.y + 'px',
            left: this.props.point.x + 'px',
        };

        return (
            <div className="graph-dot" style={style}/>
        );
    }
}

export default Point;
