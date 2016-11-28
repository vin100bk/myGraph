import React, { Component } from 'react';

import './GraphToolBar.css';

import GraphOptions from '../GraphOptions/GraphOptions';
import GraphButtons from '../GraphButtons/GraphButtons';

class GraphToolBar extends Component {
    constructor(props) {
        super(props);

        this.handleNewGraph = this.handleNewGraph.bind(this);
    }

    /**
     * Create a new graph
     */
    handleNewGraph() {
        this.props.onNewGraph();
    }

    render() {
        return (
            <section id="graph-toolbar">
                <GraphOptions />
                <GraphButtons onNewGraph={this.handleNewGraph}/>
            </section>
        );
    }
}

export default GraphToolBar;
