import React, { Component } from 'react';

import './GraphEditorToolBarPoint.css';

import GraphEditorToolBarColor from '../GraphEditorToolBarColor/GraphEditorToolBarColor';
import GraphEditorToolBarAnimation from '../GraphEditorToolBarAnimation/GraphEditorToolBarAnimation';

class GraphEditorToolBarPoint extends Component {
    /**
     * Is animation enabled for this point?
     * @returns {boolean}
     */
    isAnimationEnabled() {
        let hasLinksTo = false;
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];

            if (link.to === this.props.point.name) {
                // Link to
                if (!link.animation) {
                    return false;
                } else {
                    hasLinksTo = true;
                }
            } else if (link.from === this.props.point.name) {
                // Link from
                if (!link.animation) {
                    return false;
                }
            }

            return hasLinksTo;
        }
    }

    render() {
        return (
            <div className="graph-editor-toolbar-content">
                <GraphEditorToolBarColor entity={this.props.point} defaultColor={this.props.defaultColor}
                                         allColor={this.props.allColor} onUpdate={this.props.onUpdate}
                                         onApplyAll={this.props.onApplyAll}
                                         onUpdateDefaultColor={this.props.onUpdateDefaultColor}/>

                <GraphEditorToolBarAnimation entity={this.props.point} onUpdate={this.props.onUpdate}/>
            </div>
        );
    }
}

export default GraphEditorToolBarPoint;
