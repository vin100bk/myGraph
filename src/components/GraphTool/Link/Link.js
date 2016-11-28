import React, { Component } from 'react';

import './Link.css';

class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {isSelected: false};

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Click on a link
     */
    handleClick(e) {
        e.stopPropagation();
        this.props.onClick(this);
    }

    render() {
        const style = {
            top: this.props.link.y + 'px',
            left: this.props.link.x + 'px',
            transform: 'rotate(' + this.props.link.angle + 'rad)',
            width: this.props.link.width + 'px'
        };

        return (
            <div className={this.state.isSelected ? 'graph-line active' : 'graph-line'} style={style}
                 onClick={this.handleClick}>
                <div className="graph-line-inner"/>
            </div>
        );
    }
}

export default Link;
