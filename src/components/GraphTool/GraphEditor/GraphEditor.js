import React, { Component } from 'react';

import './GraphEditor.css';

import Point from '../Point/Point';
import Link from '../Link/Link';

class GraphEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const coordinatesParent = document.getElementById('graph-editor-panel').getBoundingClientRect();
        const x = e.pageX - coordinatesParent.left - 9;
        const y = e.pageY - coordinatesParent.top - 9;
        this.props.onAddPoint(x, y);
    }

    render() {
        var children = [];
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            children.push(<Point key={name} point={point}/>);
        }

        // Links
        this.props.links.forEach(function (link) {
            let linkKey = link.from + '-' + link.to;
            children.push(<Link key={linkKey} link={link}/>);
        });

        return (
            <section id="graph-editor">
                <h1>Graph editor</h1>
                <div id="graph-editor-panel" onClick={this.handleClick}>
                    {children}
                </div>
            </section>
        );
    }
}

export default GraphEditor;
