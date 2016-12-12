import React, { Component } from 'react';

import './GraphEditorToolBarTooltip.css';

import InputColor from '../../../Form/InputColor/InputColor';
import ApplyAllColor from '../../../Form/ApplyAllColor/ApplyAllColor';
import ToggleAnimation from '../../../Form/ToggleAnimation/ToggleAnimation';

class GraphEditorToolBarTooltip extends Component {
    constructor(props) {
        super(props);

        this.state = this.getDefaultState(this.props);

        this.handleStartTypingColor = this.handleStartTypingColor.bind(this);
        this.handleStopTypingColor = this.handleStopTypingColor.bind(this);
        this.handleStartTypingFontColor = this.handleStartTypingFontColor.bind(this);
        this.handleStopTypingFontColor = this.handleStopTypingFontColor.bind(this);
        this.handleUpdateColor = this.handleUpdateColor.bind(this);
        this.handleUpdateFontColor = this.handleUpdateFontColor.bind(this);
        this.handleApplyAllColor = this.handleApplyAllColor.bind(this);
        this.handleUpdateDefaultColor = this.handleUpdateDefaultColor.bind(this);
    }

    /**
     * Get the default state
     * @param props
     * @returns {{isColorTyping: *}}
     */
    getDefaultState(props) {
        return {isColorTyping: false, isFontColorTyping: false};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tooltip.name !== nextProps.tooltip.name) {
            // The tooltip changed
            this.setState(this.getDefaultState(nextProps));
        }
    }

    /**
     * Start typing
     * @param value
     */
    handleStartTypingColor(value) {
        this.setState((prevState, props) => {
            prevState.isColorTyping = true;
            return prevState;
        });
    }

    /**
     * Stop typing
     * @param value
     */
    handleStopTypingColor(value) {
        this.setState((prevState, props) => {
            prevState.isColorTyping = false;
            return prevState;
        });
    }

    /**
     * Start typing
     * @param value
     */
    handleStartTypingFontColor(value) {
        this.setState((prevState, props) => {
            prevState.isFontColorTyping = true;
            return prevState;
        });
    }

    /**
     * Stop typing
     * @param value
     */
    handleStopTypingFontColor(value) {
        this.setState((prevState, props) => {
            prevState.isFontColorTyping = false;
            return prevState;
        });
    }

    /**
     * When update the color
     * @param color
     */
    handleUpdateColor(color) {
        this.props.onUpdate({color: color});
    }

    /**
     * When update the font color
     * @param color
     */
    handleUpdateFontColor(color) {
        this.props.onUpdate({fontColor: color});
    }

    /**
     * Apply the color for all points
     */
    handleApplyAllColor() {
        this.props.onApplyAll({color: this.props.tooltip.color, fontColor: this.props.tooltip.fontColor});
    }

    /**
     * Update the default colors
     */
    handleUpdateDefaultColor() {
        this.props.onUpdateDefaultColor(this.props.tooltip.color, this.props.tooltip.fontColor);
    }

    render() {
        const delim = '@';

        return (
            <div className="graph-editor-toolbar-content">
                <InputColor color={this.props.tooltip.color}
                            defaultColor={this.props.defaultColor}
                            onStartTyping={this.handleStartTypingColor}
                            onStopTyping={this.handleStopTypingColor}
                            onUpdate={this.handleUpdateColor}/>

                <InputColor color={this.props.tooltip.fontColor}
                            defaultColor={this.props.defaultFontColor}
                            label="Font color"
                            onStartTyping={this.handleStartTypingFontColor}
                            onStopTyping={this.handleStopTypingFontColor}
                            onUpdate={this.handleUpdateFontColor}/>

                <ApplyAllColor color={this.props.tooltip.color + delim + this.props.tooltip.fontColor}
                               defaultColor={this.props.defaultColor + delim + this.props.defaultFontColor}
                               allColor={this.props.allColor + delim + this.props.allFontColor}
                               disabled={this.state.isColorTyping || this.state.isFontColorTyping}
                               onApplyAll={this.handleApplyAllColor}
                               onUpdateDefaultColor={this.handleUpdateDefaultColor}/>

                <ToggleAnimation isAnimation={this.props.tooltip.animation}
                                 animationStart={this.props.tooltip.animationStart}
                                 animationDuration={this.props.tooltip.animationDuration}
                                 onUpdate={this.props.onUpdate}/>
            </div>
        );
    }
}

export default GraphEditorToolBarTooltip;
