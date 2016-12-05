import React, { Component } from 'react';
import Domtoimage from 'dom-to-image';

import './GraphButtons.css';

import GraphButton from './GraphButton/GraphButton';

class GraphButtons extends Component {
    constructor(props) {
        super(props);

        this.handleNew = this.handleNew.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
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
     * Create a new graph from the current one
     * @param e
     */
    handleCopy(e) {
        e.preventDefault();
        this.props.onCopyGraph();
    }

    /**
     * Save as picture
     */
    handleSavePicture(e) {
        e.preventDefault();
        Domtoimage.toSvg(document.getElementById('graph-visualization-panel'))
            .then(function (imgContent) {
                let link = document.createElement('a');
                link.download = 'myGraph.svg';
                link.href = imgContent;
                link.click();

            });
    }

    render() {
        return (
            <section className="graph-buttons">
                {Object.keys(this.props.points).length > 0 &&
                <GraphButton onClick={this.handleNew}>
                    <i className="fa fa-file-o" aria-hidden="true"></i>
                    New graph
                </GraphButton>
                }

                {this.props.currentHistoryRow &&
                <GraphButton onClick={this.handleCopy}>
                    <i className="fa fa-files-o" aria-hidden="true"></i>
                    Copy graph
                </GraphButton>
                }

                {Object.keys(this.props.points).length > 0 &&
                <GraphButton onClick={this.handleSavePicture}>
                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                    Save as picture
                </GraphButton>
                }
            </section>
        );
    }
}

export default GraphButtons;
