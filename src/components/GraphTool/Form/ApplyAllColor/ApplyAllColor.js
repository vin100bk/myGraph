import React, { Component } from 'react';

import './ApplyAllColor.css';

class ApplyAllColor extends Component {
    constructor(props) {
        super(props);

        this.handleApplyAll = this.handleApplyAll.bind(this);
        this.handleUseDefaultColor = this.handleUseDefaultColor.bind(this);
    }

    /**
     * Apply this color for all the points
     * @param e
     */
    handleApplyAll(e) {
        e.preventDefault();
        this.props.onApplyAll();
    }

    /**
     * Use this color as default
     * @param e
     */
    handleUseDefaultColor(e) {
        e.preventDefault();
        this.props.onUpdateDefaultColor();
    }

    render() {
        return (
            <div>
                {!this.props.disabled && this.props.allColor !== this.props.color &&
                <p className="apply-all-color-link"><a href="#" onClick={this.handleApplyAll}>Apply all</a></p>
                }

                {!this.props.disabled && this.props.defaultColor !== this.props.color &&
                <p className="apply-all-color-link">
                    <a href="#" onClick={this.handleUseDefaultColor}>Use as default</a>
                </p>
                }
            </div>
        );
    }
}

export default ApplyAllColor;
