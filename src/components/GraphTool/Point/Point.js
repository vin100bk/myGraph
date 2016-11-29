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
        const styleCoordinatesX = {
            top: Math.round(this.props.point.y + 9) + 'px',
        };

        const styleCoordinatesY = {
            left: Math.round(this.props.point.x + 9) + 'px',
        };

        const style = {
            top: this.props.point.y + 'px',
            left: this.props.point.x + 'px',
        };

        return (
            <div>
                <div className={this.state.isSelected ? 'graph-dot active' : 'graph-dot'} style={style}
                     onClick={this.handleClick} onMouseOver={this.props.onMouseOver}
                     onMouseOut={this.props.onMouseOut}/>
                <div
                    className={'graph-dot-coordinates graph-dot-coordinates-x graph-dot-coordinates-x-' + styleCoordinatesX.top}
                    style={styleCoordinatesX}/>
                <div
                    className={'graph-dot-coordinates graph-dot-coordinates-y graph-dot-coordinates-y-' + styleCoordinatesY.left}
                    style={styleCoordinatesY}/>
            </div>
        );
    }
}

export default Point;
