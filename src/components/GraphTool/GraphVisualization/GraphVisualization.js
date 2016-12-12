import React, { Component } from 'react';

import './GraphVisualization.css';

import Point from '../Point/Point';
import Link from '../Link/Link';
import Tooltip from '../Tooltip/Tooltip';

class GraphVisualization extends Component {
    componentDidUpdate(prevProps, prevState) {
        this.play();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    /**
     * Clear the timer
     */
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    /**
     * Play the animations
     */
    play() {
        this.clearTimer();

        this.panel.classList.remove('active');
        this.timer = setTimeout(function () {
            this.panel.classList.add('active');
        }.bind(this), 0);
    }

    render() {
        let children = [];
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            children.push(<Point key={name} point={point} draggable="false"/>);
        }

        // Links
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            children.push(<Link key={name} link={link}/>);
        }

        // Links
        for (const name of Object.keys(this.props.tooltips)) {
            let tooltip = this.props.tooltips[name];
            children.push(<Tooltip key={name} tooltip={tooltip}/>);
        }

        return (
            <section id="graph-visualization">
                <h1>Graph visualization</h1>

                <div id="graph-visualization-panel" ref={(panel) => { this.panel = panel; }}>
                    {children}
                </div>
            </section>
        );
    }
}

export default GraphVisualization;
