import React, { Component } from 'react';

import './Tooltip.css';

class Tooltip extends Component {
    constructor(props) {
        super(props);

        if (typeof this.props.tooltip.name !== 'string') {
            throw new Error('A tooltip name has to be a string. "' + this.props.tooltip.name + '" is not a string');
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleRename = this.handleRename.bind(this);
    }

    /**
     * When a drag is started on a tooltip
     * @param e
     */
    handleDragStart(e) {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData('Tooltip', JSON.stringify(this.props.tooltip));
        e.dataTransfer.setData('Mouse', JSON.stringify({
            x: e.pageX,
            y: e.pageY
        }));
    }

    /**
     * Click on a tooltip
     * @param e
     */
    handleClick(e) {
        e.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick(this.props.tooltip);
        }
    }

    /**
     * Rename the tooltip
     */
    handleRename(e) {
        e.stopPropagation();
        if (this.props.onUpdate) {
            let text = prompt('Please enter the text of your tooltip', this.props.tooltip.text);
            if (text !== null) {
                let regex = /[^s]+/;
                if (!regex.test(text)) {
                    // A non authorized character detected
                    alert('Error. The text have to be non empty');
                } else {
                    this.props.onUpdate({text: text});
                }
            }
        }
    }

    render() {
        /*
         * Style
         */
        let style = {
            top: this.props.tooltip.y + 'px',
            left: this.props.tooltip.x + 'px',
            color: this.props.tooltip.fontColor,
            backgroundColor: this.props.tooltip.color
        };


        if (this.props.tooltip.animation) {
            Object.assign(style, {
                transition: 'opacity ' + this.props.tooltip.animationDuration + 's ' + this.props.tooltip.animationStart + 's, margin-top ' + this.props.tooltip.animationDuration + 's ' + this.props.tooltip.animationStart + 's'
            });
        }

        /*
         * Classes
         */
        let classes = 'graph-tooltip';
        if (this.props.isSelected) {
            classes += ' active';
        }
        if (this.props.tooltip.animation) {
            classes += ' graph-tooltip-animated';
        }

        return (
            <div className={classes} style={style} draggable={this.props.draggable && this.props.isSelected}
                 onClick={this.handleClick} onDoubleClick={this.handleRename} onDragStart={this.handleDragStart}>
                {this.props.tooltip.text}
            </div>
        );
    }
}

export default Tooltip;
