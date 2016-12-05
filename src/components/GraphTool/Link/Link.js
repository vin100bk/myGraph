import React, { Component } from 'react';

import './Link.css';

class Link extends Component {
    constructor(props) {
        super(props);

        if (typeof this.props.link.from !== 'string') {
            throw new Error('A point name has to a string. "' + this.props.link.from + '" is not a string');
        }
        if (typeof this.props.link.to !== 'string') {
            throw new Error('A point name has to a string. "' + this.props.link.to + '" is not a string');
        }

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Click on a link
     */
    handleClick(e) {
        e.stopPropagation();
        this.props.onClick(this.props.link);
    }

    render() {
        const style = {
            top: this.props.link.y + 'px',
            left: this.props.link.x + 'px',
            transform: 'rotate(' + this.props.link.angle + 'rad)',
            width: this.props.link.width + 'px'
        };

        const innerStyle = {
            backgroundColor: this.props.link.color
        };

        return (
            <div className={this.props.isSelected ? 'graph-line active' : 'graph-line'} style={style}
                 onClick={this.handleClick}>
                <div className="graph-line-inner" style={innerStyle}/>
            </div>
        );
    }
}

export default Link;
