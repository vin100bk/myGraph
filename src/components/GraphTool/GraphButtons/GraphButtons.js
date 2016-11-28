import React, { Component } from 'react';
import Domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import './GraphButtons.css';

import GraphButton from './GraphButton/GraphButton';

class GraphButtons extends Component {
    constructor(props) {
        super(props);

        this.handleSavePicture = this.handleSavePicture.bind(this);
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
                <GraphButton onClick={this.handleSavePicture}>
                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                    Save as picture
                </GraphButton>
            </section>
        );
    }
}

export default GraphButtons;
