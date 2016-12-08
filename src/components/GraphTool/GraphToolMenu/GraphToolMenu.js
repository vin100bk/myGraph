import React, { Component } from 'react';

import './GraphToolMenu.css';

import GraphOptions from '../GraphOptions/GraphOptions';
import GraphButtons from '../GraphButtons/GraphButtons';

class GraphToolMenu extends Component {
    render() {
        return (
            <section id="graph-menu">
                <GraphOptions history={this.props.history} currentHistoryRow={this.props.currentHistoryRow}
                              onClickHistoryRow={this.props.onClickHistoryRow}
                              onRenameHistoryRow={this.props.onRenameHistoryRow}
                              onDeleteHistoryRow={this.props.onDeleteHistoryRow}
                              onEmptyHistory={this.props.onEmptyHistory}/>

                <GraphButtons points={this.props.points} links={this.props.links}
                              currentHistoryRow={this.props.currentHistoryRow} onNewGraph={this.props.onNewGraph}
                              onCopyGraph={this.props.onCopyGraph} onPlay={this.props.onPlay}/>
            </section>
        );
    }
}

export default GraphToolMenu;
