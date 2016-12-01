import React, { Component } from 'react';

import './CoordPoint.css';

import Point from '../Point/Point';

class CoordPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {isSelected: false};

        this.handleHoverPoint = this.handleHoverPoint.bind(this);
        this.handleOutPoint = this.handleOutPoint.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    /**
     * When hover a point
     * @param e
     */
    handleHoverPoint(e) {
        this.disableCoordinates();
    }

    /**
     * When mouse out on a point
     * @param e
     */
    handleOutPoint(e) {
        this.enableCoordinates();
    }

    /**
     * When a drag on a point start
     */
    handleDragStart() {
        this.enableCoordinates();
    }

    /**
     * Enable the coordinate lines
     */
    enableCoordinates() {
        let lines = document.getElementsByClassName('graph-dot-coordinates');
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.display = 'block';
        }
    }

    /**
     * Disable the coordinate links
     */
    disableCoordinates() {
        let lines = document.getElementsByClassName('graph-dot-coordinates');
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.display = 'none';
        }
    }

    render() {
        const styleCoordinatesX = {
            top: Math.round(this.props.point.y + 9) + 'px',
        };

        const styleCoordinatesY = {
            left: Math.round(this.props.point.x + 9) + 'px',
        };

        return (
            <div>
                <Point point={this.props.point} onClick={this.props.onClick}
                       onMouseOver={this.handleHoverPoint} onMouseOut={this.handleOutPoint}
                       onDragStart={this.handleDragStart}/>

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

export default CoordPoint;
