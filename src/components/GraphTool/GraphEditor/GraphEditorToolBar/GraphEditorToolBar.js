import React, { Component } from 'react';

import './GraphEditorToolBar.css';

import GraphEditorToolBarPoint from './GraphEditorToolBarPoint/GraphEditorToolBarPoint';
import GraphEditorToolBarLink from './GraphEditorToolBarLink/GraphEditorToolBarLink';
import GraphEditorToolBarTooltip from './GraphEditorToolBarTooltip/GraphEditorToolBarTooltip';

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

        // Tooltips
        let allTooltipsColor;
        let allTooltipsFontColor;
        for (const name of Object.keys(this.props.tooltips)) {
            let tooltip = this.props.tooltips[name];

            // Store the color of all tooltips (if all links have the same color, null otherwise)
            if (typeof allTooltipsColor === 'undefined') {
                allTooltipsColor = tooltip.color;
            } else if (allTooltipsColor !== tooltip.color) {
                allTooltipsColor = null;
            }

            // Store the font color of all tooltips (if all links have the same color, null otherwise)
            if (typeof allTooltipsFontColor === 'undefined') {
                allTooltipsFontColor = tooltip.fontColor;
            } else if (allTooltipsFontColor !== tooltip.fontColor) {
                allTooltipsFontColor = null;
            }
        }

        return (
            <section id="graph-editor-toolbar">
                <h1 className="title-menu">Toolbar</h1>

                {this.props.point &&
                <GraphEditorToolBarPoint point={this.props.point}
                                         defaultColor={this.props.defaultPointColor}
                                         allColor={allPointsColor}
                                         onUpdate={this.props.onUpdatePoint}
                                         onApplyAll={this.props.onApplyAllPoints}
                                         onUpdateDefaultColor={this.props.onUpdateDefaultPointColor}/>
                }

                {this.props.link &&
                <GraphEditorToolBarLink link={this.props.link}
                                        defaultColor={this.props.defaultLinkColor}
                                        allColor={allLinksColor}
                                        onUpdate={this.props.onUpdateLink}
                                        onApplyAll={this.props.onApplyAllLinks}
                                        onUpdateDefaultColor={this.props.onUpdateDefaultLinkColor}/>
                }

                {this.props.tooltip &&
                <GraphEditorToolBarTooltip tooltip={this.props.tooltip}
                                           defaultColor={this.props.defaultTooltipColor}
                                           defaultFontColor={this.props.defaultTooltipFontColor}
                                           allColor={allTooltipsColor}
                                           allFontColor={allTooltipsFontColor}
                                           onUpdate={this.props.onUpdateTooltip}
                                           onApplyAll={this.props.onApplyAllTooltips}
                                           onUpdateDefaultColor={this.props.onUpdateDefaultTooltipColor}/>
                }
            </section>
        );
    }
}

export default GraphEditorToolBar;
