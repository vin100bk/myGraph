import React, { Component } from 'react';

class GraphHistoryRow extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClickRename = this.handleClickRename.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    /**
     * Click on a history row
     */
    handleClick() {
        this.props.onClick(this.props.history);
    }

    /**
     * Click on the rename icon
     */
    handleClickRename(e) {
        e.stopPropagation();
        let newName = prompt('Please enter the name of your graph', this.props.history.name);
        if (newName !== null) {
            let regex = /[^a-zA-Z0-9 _-]/;
            if (regex.test(newName)) {
                // A non authorized character detected
                alert('Error. Only alpha-numeric characters are accepted');
            } else {
                this.props.onRename(newName, this.props.history.name);
            }
        }
    }

    /**
     * Click on the delete icon
     */
    handleClickDelete(e) {
        e.stopPropagation();
        if (confirm('Are you sure to delete the history "' + this.props.history.name + '"?')) {
            this.props.onDelete(this.props.history.name);
        }
    }

    render() {
        return (
            <li onClick={this.handleClick} className={this.props.selected ? 'selected' : ''}>
                {this.props.selected &&
                <span>
                    <i className="fa fa-pencil" aria-hidden="true" onClick={this.handleClickRename}></i>
                    <i className="fa fa-trash" aria-hidden="true" onClick={this.handleClickDelete}></i>
                </span>}
                <h2 className="ellipsis">{this.props.history.name}</h2>

                <p>{new Date(this.props.history.lastModification).toLocaleString()}</p>
            </li>
        );
    }
}

export default GraphHistoryRow;
