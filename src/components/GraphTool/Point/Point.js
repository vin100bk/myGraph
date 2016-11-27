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
        this.setState({isSelected: true});
        this.props.onClick(this);

        document.onkeyup = function (event) {
            if(event.keyCode === 27) {
                // Escape
                this.setState({isSelected: false});
                this.props.onEscape();
            } else if(event.keyCode === 8) {
                this.props.onDelete(this);
            }
        }.bind(this);
    }

    render() {
        const style = {
            top: this.props.point.y + 'px',
            left: this.props.point.x + 'px',
        };

        return (
            <div className={this.state.isSelected ? 'graph-dot active' : 'graph-dot'} style={style}
                 onClick={this.handleClick}/>
        );
    }
}

export default Point;
