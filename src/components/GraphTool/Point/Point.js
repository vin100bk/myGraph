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
        let style = {
            top: this.props.point.y + 'px',
            left: this.props.point.x + 'px',
        };

        const spanStyle = {
            backgroundColor: this.props.point.color
        };

        /*
         * Style
         */
        if (this.props.point.animation) {
            Object.assign(style, {
                transition: 'opacity ' + this.props.point.animationDuration + 's ' + this.props.point.animationStart + 's, transform ' + this.props.point.animationDuration + 's ' + this.props.point.animationStart + 's'
            });
        }

        /*
         * Classes
         */
        let classes = 'graph-dot';
        if (this.props.isSelected) {
            classes += ' active';
        }
        if (this.props.point.animation) {
            classes += ' graph-dot-animated';
        }

        return (
            <div className={classes} style={style} draggable={this.props.draggable}
                 onClick={this.handleClick} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}
                 onDragStart={this.handleDragStart}><span style={spanStyle} className="graph-dot-inner"/></div>
        );
    }
}

export default Point;
