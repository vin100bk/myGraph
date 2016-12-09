import React, { Component } from 'react';

import './Point.css';

class Point extends Component {
    constructor(props) {
        super(props);

        if (typeof this.props.point.name !== 'string') {
            throw new Error('A point name has to be a string. "' + this.props.point.name + '" is not a string');
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    /**
     * When a drag is started on a point
     * @param e
     */
    handleDragStart(e) {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData('Point', JSON.stringify(this.props.point));
        this.props.onDragStart();
    }

    /**
     * Click on a point
     * @param e
     */
    handleClick(e) {
        e.stopPropagation();
        this.props.onClick(this.props.point);
    }

    render() {
        const style = {
            top: this.props.point.y + 'px',
            left: this.props.point.x + 'px',
        };

        const spanStyle = {
            backgroundColor: this.props.point.color
        };

        return (
            <div className={this.props.isSelected ? 'graph-dot active' : 'graph-dot'} style={style} draggable="true"
                 onClick={this.handleClick} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}
                 onDragStart={this.handleDragStart}><span style={spanStyle} className="graph-dot-inner"/></div>
        );
    }
}

export default Point;
