import React, { Component } from 'react';

import './GraphOptions.css';

import GraphHistory from '../GraphHistory/GraphHistory';

class GraphOptions extends Component {
    render() {
        return (
            <section className="graph-options">
                <GraphHistory history={this.props.history} currentHistoryRow={this.props.currentHistoryRow}
                              onClickHistoryRow={this.props.onClickHistoryRow}
                              onRenameHistoryRow={this.props.onRenameHistoryRow}
                              onDeleteHistoryRow={this.props.onDeleteHistoryRow}/>
            </section>
        );
    }
}

export default GraphOptions;
