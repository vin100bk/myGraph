import React, { Component } from 'react';

import './GraphEditorToolBar.css';

import GraphEditorToolBarPoint from './GraphEditorToolBarPoint/GraphEditorToolBarPoint';
import GraphEditorToolBarLink from './GraphEditorToolBarLink/GraphEditorToolBarLink';

class GraphEditorToolBar extends Component {
    render() {
        let allPointsColor;
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];

            // Store the color of all points (if all points have the same color, null otherwise)
            if (typeof allPointsColor === 'undefined') {
                allPointsColor = point.color;
            } else if (allPointsColor !== point.color) {
                allPointsColor = null;
            }

        }

        // Links
        let allLinksColor;
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];

            // Store the color of all links (if all links have the same color, null otherwise)
            if (typeof allLinksColor === 'undefined') {
                allLinksColor = link.color;
            } else if (allLinksColor !== link.color) {
                allLinksColor = null;
            }
        }

        return (
            <section id="graph-editor-toolbar">
                <h1 className="title-menu">Toolbar</h1>

                {this.props.point &&
                <GraphEditorToolBarPoint links={this.props.links} point={this.props.point}
                                         defaultColor={this.props.defaultPointColor}
                                         allColor={allPointsColor}
                                         onUpdate={this.props.onUpdatePoint} onApplyAll={this.props.onApplyAllPoints}
                                         onUpdateDefaultColor={this.props.onUpdateDefaultPointColor}/>
                }

                {this.props.link &&
                <GraphEditorToolBarLink link={this.props.link} defaultColor={this.props.defaultLinkColor}
                                        allColor={allLinksColor}
                                        onUpdate={this.props.onUpdateLink} onApplyAll={this.props.onApplyAllLinks}
                                        onUpdateDefaultColor={this.props.onUpdateDefaultLinkColor}/>
                }
            </section>
        );
    }
}

export default GraphEditorToolBar;
