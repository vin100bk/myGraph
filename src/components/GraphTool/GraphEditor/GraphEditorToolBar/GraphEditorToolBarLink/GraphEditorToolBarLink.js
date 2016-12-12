import React, { Component } from 'react';

import './GraphEditorToolBarLink.css';

import InputColor from '../../../Form/InputColor/InputColor';
import ApplyAllColor from '../../../Form/ApplyAllColor/ApplyAllColor';
import ToggleAnimation from '../../../Form/ToggleAnimation/ToggleAnimation';

class GraphEditorToolBarLink extends Component {
    constructor(props) {
        super(props);

        this.state = this.getDefaultState(this.props);

        this.handleStartTypingColor = this.handleStartTypingColor.bind(this);
        this.handleStopTypingColor = this.handleStopTypingColor.bind(this);
        this.handleUpdateColor = this.handleUpdateColor.bind(this);
        this.handleApplyAllColor = this.handleApplyAllColor.bind(this);
        this.handleUpdateDefaultColor = this.handleUpdateDefaultColor.bind(this);
    }

    /**
     * Get the default state
     * @param props
     * @returns {{isColorTyping: *}}
     */
    getDefaultState(props) {
        return {isColorTyping: false};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.link.name !== nextProps.link.name) {
            // The point changed
            this.setState(this.getDefaultState(nextProps));
        }
    }

    /**
     * Start typing
     * @param value
     */
    handleStartTypingColor(value) {
        this.setState({isColorTyping: true});
    }

    /**
     * Stop typing
     * @param value
     */
    handleStopTypingColor(value) {
        this.setState({isColorTyping: false});
    }

    /**
     * When update the color
     * @param color
     */
    handleUpdateColor(color) {
        this.props.onUpdate({color: color});
    }

    /**
     * Apply the color for all points
     */
    handleApplyAllColor() {
        this.props.onApplyAll({color: this.props.link.color});
    }

    /**
     * Update the default value
     */
    handleUpdateDefaultColor() {
        this.props.onUpdateDefaultColor(this.props.link.color);
    }

    render() {
        return (
            <div className="graph-editor-toolbar-content">
                <InputColor color={this.props.link.color}
                            defaultColor={this.props.defaultColor}
                            onStartTyping={this.handleStartTypingColor}
                            onStopTyping={this.handleStopTypingColor}
                            onUpdate={this.handleUpdateColor}/>

                <ApplyAllColor color={this.props.link.color}
                               defaultColor={this.props.defaultColor}
                               allColor={this.props.allColor}
                               disabled={this.state.isColorTyping}
                               onApplyAll={this.handleApplyAllColor}
                               onUpdateDefaultColor={this.handleUpdateDefaultColor}/>

                <ToggleAnimation isAnimation={this.props.link.animation}
                                 animationStart={this.props.link.animationStart}
                                 animationDuration={this.props.link.animationDuration}
                                 onUpdate={this.props.onUpdate}/>
            </div>
        );
    }
}

export default GraphEditorToolBarLink;
