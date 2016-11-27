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

        document.onkeyup = function (event) {
            if (this.state.pointSelected) {
                if (event.keyCode === 27) {
                    // Escape
                    this.handleEscape();
                } else if (event.keyCode === 8) {
                    // Delete
                    this.handleDeletePoint(this.state.pointSelected);
                }
            }
        }.bind(this);
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
            // A point is already selected
            try {
                this.props.onAddLink(this.state.pointSelected, point);
                this.handleEscape();
            } catch (e) {
            }
        } else {
            // No point selected
            point.setState({isSelected: true});
            this.setState({pointSelected: point});
        }
    }

    /**
     * On press on the escape key
     */
    handleEscape() {
        this.setState((prevState, props) => {
            if (prevState.pointSelected) {
                prevState.pointSelected.setState({isSelected: false});
            }

            return {pointSelected: null};
        });
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
        let children = [];
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            children.push(<Point key={name} point={point} onClick={this.handleClickPoint}/>);
        }

        // Links
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            children.push(<Link key={name} link={link}/>);
        }

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
