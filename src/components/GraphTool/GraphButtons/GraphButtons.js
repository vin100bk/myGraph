import React, { Component } from 'react';
import Domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import './GraphButtons.css';

import GraphButton from './GraphButton/GraphButton';

class GraphButtons extends Component {
    constructor(props) {
        super(props);

        this.handleNew = this.handleNew.bind(this);
        this.handleSavePicture = this.handleSavePicture.bind(this);
    }

    /**
     * Create a new graph
     */
    handleNew(e) {
        e.preventDefault();
        this.props.onNewGraph();
    }

    /**
     * Save as picture
     */
    handleSavePicture(e) {
        e.preventDefault();
        Domtoimage.toBlob(document.getElementById('graph-visualization-panel'))
            .then(function (blob) {
                FileSaver.saveAs(blob, 'myGraph.png');

            });
    }

    render() {
        return (
            <section className="graph-buttons">
                <GraphButton onClick={this.handleNew}>
                    <i className="fa fa-file-o" aria-hidden="true"></i>
                    New graph
                </GraphButton>

                <GraphButton onClick={this.handleSavePicture}>
                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                    Save as picture
                </GraphButton>
            </section>
        );
    }
}

export default GraphButtons;
