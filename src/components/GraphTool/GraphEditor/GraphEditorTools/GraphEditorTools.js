import React, { Component } from 'react';

import './GraphEditorTools.css';

class GraphEditorTools extends Component {
    constructor(props) {
        super(props);

        this.handleSelectPoint = this.handleSelectPoint.bind(this);
        this.handleSelectTooltip = this.handleSelectTooltip.bind(this);
    }

    /**
     * Click on the point icon
     */
    handleSelectPoint() {
        this.props.onUpdate('point');
    }

    /**
     * Click on the tooltip icon
     */
    handleSelectTooltip() {
        this.props.onUpdate('tooltip');
    }

    render() {
        return (
            <section id="graph-editor-tools">
                <h1 className="title-menu"><i className="fa fa-crosshairs" aria-hidden="true"></i></h1>
                <ul>
                    {this.props.current === 'point' ? (
                        <li className="selected"><i className="fa fa-circle" aria-hidden="true"/></li>
                    ) : (
                        <li title="Add point(s)" onClick={this.handleSelectPoint}>
                            <i className="fa fa-circle" aria-hidden="true"/>
                        </li>
                    )}

                    {this.props.current === 'tooltip' ? (
                        <li className="selected"><i className="fa fa-commenting" aria-hidden="true"/></li>
                    ) : (
                        <li title="Add tooltip(s)" onClick={this.handleSelectTooltip}>
                            <i className="fa fa-commenting" aria-hidden="true"/>
                        </li>
                    )}
                </ul>
            </section>
        );
    }
}

export default GraphEditorTools;
