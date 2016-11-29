import React, { Component } from 'react';

import './Point.css';

class Point extends Component {
    constructor(props) {
        super(props);
        this.state = {isSelected: false};

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Click on a point
     * @param e
     */
    handleClick(e) {
        e.stopPropagation();
        this.props.onClick(this);
    }

    render() {
        const style = {
            top: this.props.point.y + 'px',
            left: this.props.point.x + 'px',
        };

        return (
            <div className={this.state.isSelected ? 'graph-dot active' : 'graph-dot'} style={style}
                 onClick={this.handleClick} onMouseOver={this.props.onMouseOver}
                 onMouseOut={this.props.onMouseOut}/>
        );
    }
}

export default Point;
