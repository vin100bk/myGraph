import React, { Component } from 'react';

import './GraphHistory.css';

import GraphHistoryRow from './GraphHistoryRow/GraphHistoryRow';

class GraphHistory extends Component {
    constructor(props) {
        super(props);

        this.onRenameRow = this.onRenameRow.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    /**
     * Rename a history row
     * @param newName
     * @param oldName
     */
    onRenameRow(newName, oldName) {
        // Check the unicity of the name
        if (newName in this.props.history) {
            // Non uniq
            alert('The name "' + newName + '" already exists');
        } else {
            // Uniq
            this.props.onRenameHistoryRow(newName, oldName);
        }
    }

    handleClickDelete(e) {
        e.stopPropagation();
        if (confirm('Are you sure to empty all the history?')) {
            this.props.onEmptyHistory();
        }
    }

    render() {
        let children = [];
        if (Object.keys(this.props.history).length > 0) {
            // Sort the object by the last modification data
            let keys = Object.keys(this.props.history).sort(function (a, b) {
                return this.props.history[b].lastModification - this.props.history[a].lastModification
            }.bind(this));

            for (const name of keys) {
                let hist = this.props.history[name];

                if (this.props.currentHistoryRow === name) {
                    // Current history
                    children.push(<GraphHistoryRow key={name} history={hist} onClick={this.props.onClickHistoryRow}
                                                   onRename={this.onRenameRow} onDelete={this.props.onDeleteHistoryRow}
                                                   selected/>);
                } else {
                    children.push(<GraphHistoryRow key={name} history={hist} onClick={this.props.onClickHistoryRow}/>);
                }
            }
        }

        return (
            <section className="graph-history">
                <h1 className="title-menu">
                    {children.length > 0 &&
                    <i className="fa fa-trash icon" aria-hidden="true" onClick={this.handleClickDelete}></i>}
                    History
                </h1>

                {children.length > 0 ? (
                    <ul>{children}</ul>
                ) : (
                    <p className="none">No history</p>
                )}
            </section>
        );
    }
}

export default GraphHistory;
