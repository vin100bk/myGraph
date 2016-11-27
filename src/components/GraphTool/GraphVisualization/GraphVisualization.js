import React, { Component } from 'react';

import './GraphVisualization.css';

import Point from '../Point/Point';
import Link from '../Link/Link';

class GraphVisualization extends Component {
    render() {
        let children = [];
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            children.push(<Point key={name} point={point}/>);
        }

        // Links
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            children.push(<Link key={name} link={link}/>);
        }

        return (
            <section id="graph-visualization">
                <h1>Graph visualization</h1>

                <div id="graph-visualization-panel">
                    {children}
                </div>
            </section>
        );
    }
}

export default GraphVisualization;
