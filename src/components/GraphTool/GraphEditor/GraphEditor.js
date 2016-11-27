import React, { Component } from 'react';

import './GraphEditor.css';

import Point from '../Point/Point';
import Link from '../Link/Link';

class GraphEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {pointSelected: null};

        this.handleClick = this.handleClick.bind(this);
        this.handleClickPoint = this.handleClickPoint.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleDeletePoint = this.handleDeletePoint.bind(this);
    }

    /**
     * Click in the editor besides points and links
     * @param e
     */
    handleClick(e) {
        if (this.state.pointSelected === null) {
            const coordinatesParent = document.getElementById('graph-editor-panel').getBoundingClientRect();
            const x = e.pageX - coordinatesParent.left - 9;
            const y = e.pageY - coordinatesParent.top - 9;
            this.props.onAddPoint(x, y);
        }
    }

    /**
     * On click on a point
     * @param point
     */
    handleClickPoint(point) {
        if (this.state.pointSelected) {
            this.state.pointSelected.setState({isSelected: false});
        }

        this.setState({pointSelected: point});
    }

    /**
     * On press on the escape key
     */
    handleEscape() {
        this.setState({pointSelected: null});
    }

    /**
     * On delete a point
     * @param point
     */
    handleDeletePoint(point) {
        this.props.onDeletePoint(point);
        this.handleEscape();
    }

    render() {
        var children = [];
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            children.push(<Point key={name} point={point} onClick={this.handleClickPoint}
                                 onEscape={this.handleEscape} onDelete={this.handleDeletePoint}/>);
        }

        // Links
        this.props.links.forEach(function (link) {
            let linkKey = link.from + '-' + link.to;
            children.push(<Link key={linkKey} link={link}/>);
        });

        return (
            <section id="graph-editor">
                <h1>Graph editor</h1>

                <div id="graph-editor-panel" className={this.state.pointSelected ? 'point-selected' : ''}
                     onClick={this.handleClick}>
                    {children}
                </div>
            </section>
        );
    }
}

export default GraphEditor;
