import React, { Component } from 'react';

import './GraphEditorToolBar.css';

import GraphEditorToolBarPoint from './GraphEditorToolBarPoint/GraphEditorToolBarPoint';
import GraphEditorToolBarLink from './GraphEditorToolBarLink/GraphEditorToolBarLink';

class GraphEditorToolBar extends Component {
    render() {
        return (
            <section id="graph-editor-toolbar">
                <h1 className="title-menu">Toolbar</h1>

                {this.props.point &&
                <GraphEditorToolBarPoint point={this.props.point} defaultColor={this.props.defaultPointColor}
                                         allColor={this.props.allPointsColor}
                                         onUpdate={this.props.onUpdatePoint} onApplyAll={this.props.onApplyAllPoints}
                                         onUpdateDefaultColor={this.props.onUpdateDefaultPointColor}/>
                }

                {this.props.link &&
                <GraphEditorToolBarLink link={this.props.link} defaultColor={this.props.defaultLinkColor}
                                         allColor={this.props.allLinksColor}
                                         onUpdate={this.props.onUpdateLink} onApplyAll={this.props.onApplyAllLinks}
                                         onUpdateDefaultColor={this.props.onUpdateDefaultLinkColor}/>
                }
            </section>
        );
    }
}

export default GraphEditorToolBar;
