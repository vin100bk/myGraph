import React, { Component } from 'react';

import './GraphToolBar.css';

import GraphOptions from '../GraphOptions/GraphOptions';
import GraphButtons from '../GraphButtons/GraphButtons';

class GraphToolBar extends Component {
    render() {
        return (
            <section id="graph-toolbar">
                <GraphOptions history={this.props.history} currentHistoryRow={this.props.currentHistoryRow}
                              onClickHistoryRow={this.props.onClickHistoryRow}
                              onRenameHistoryRow={this.props.onRenameHistoryRow}
                              onDeleteHistoryRow={this.props.onDeleteHistoryRow}/>

                <GraphButtons currentHistoryRow={this.props.currentHistoryRow} onNewGraph={this.props.onNewGraph}
                              onCopyGraph={this.props.onCopyGraph}/>
            </section>
        );
    }
}

export default GraphToolBar;
