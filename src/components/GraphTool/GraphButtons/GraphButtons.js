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
        this.handlePlay = this.handlePlay.bind(this);
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

        if (this.isGraphAnimated()) {
            // If the graph is animated, notify the user that animations are ignored in the picture
            alert('This graph contains some animations, these ones are ignored in the picture. We are not able to save animated picture so far');
        }

        Domtoimage.toSvg(document.getElementById('graph-visualization-panel'))
            .then(function (imgContent) {
                let link = document.createElement('a');
                link.download = 'myGraph.svg';
                link.href = imgContent;
                link.click();

            });
    }

    /**
     * Play the graph
     */
    handlePlay(e) {
        e.preventDefault();
        this.props.onPlay();
    }

    /**
     * Is the graph animated
     * @returns {boolean}
     */
    isGraphAnimated() {
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            if (link.animation) {
                return true;
            }
        }

        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            if (point.animation) {
                return true;
            }
        }

        return false;
    }

    render() {
        return (
            <section className="graph-buttons">
                {this.isGraphAnimated() &&
                <GraphButton onClick={this.handlePlay} className="graph-button-play">
                    <i className="fa fa-play-circle" aria-hidden="true"></i>
                    Play
                </GraphButton>
                }

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
