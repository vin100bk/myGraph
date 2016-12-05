import React, { Component } from 'react';

import './GraphEditorToolBarPoint.css';

import GraphEditorToolBarColor from '../GraphEditorToolBarColor/GraphEditorToolBarColor';

class GraphEditorToolBarPoint extends Component {
    render() {
        return (
            <div className="graph-editor-toolbar-content">
                <GraphEditorToolBarColor entity={this.props.point} defaultColor={this.props.defaultColor}
                                         allColor={this.props.allColor} onUpdate={this.props.onUpdate}
                                         onApplyAll={this.props.onApplyAll}
                                         onUpdateDefaultColor={this.props.onUpdateDefaultColor}/>
            </div>
        );
    }
}

export default GraphEditorToolBarPoint;
