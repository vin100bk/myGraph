import React, { Component } from 'react';

import './GraphToolBar.css';

import GraphOptions from '../GraphOptions/GraphOptions';
import GraphButtons from '../GraphButtons/GraphButtons';

class GraphToolBar extends Component {
    render() {
        return (
            <section id="graph-toolbar">
                <GraphOptions />
                <GraphButtons />
            </section>
        );
    }
}

export default GraphToolBar;
