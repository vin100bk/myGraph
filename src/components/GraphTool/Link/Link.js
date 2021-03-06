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
        if (this.props.onClick) {
            e.stopPropagation();
            this.props.onClick(this.props.link);
        }
    }

    render() {
        /*
         * Style
         */
        const style = {
            top: this.props.link.y + 'px',
            left: this.props.link.x + 'px',
            transform: 'rotate(' + this.props.link.angle + 'rad)',
            width: this.props.link.width + 'px'
        };

        let innerStyle = {
            backgroundColor: this.props.link.color
        };
        if (this.props.link.animation) {
            Object.assign(innerStyle, {
                transition: 'width ' + this.props.link.animationDuration + 's ' + this.props.link.animationStart + 's'
            });
        }

        /*
         * Classes
         */
        let classes = 'graph-line';
        if (this.props.isSelected) {
            classes += ' active';
        }
        if (this.props.link.animation) {
            classes += ' graph-line-animated';
        }

        return (
            <div className={classes} style={style} onClick={this.handleClick}>
                <div className="graph-line-inner" style={innerStyle}/>
            </div>
        );
    }
}

export default Link;
