import React, { Component } from 'react';

import './GraphEditorToolBarColor.css';

class GraphEditorToolBarColor extends Component {
    constructor(props) {
        super(props);

        this.state = {color: this.props.entity.color, colorValid: this.props.entity.color};

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleResetDefaultColor = this.handleResetDefaultColor.bind(this);
        this.handleApplyAll = this.handleApplyAll.bind(this);
        this.handleUseDefaultColor = this.handleUseDefaultColor.bind(this);
    }

    /**
     * When the user change the color
     * @param e
     */
    handleChange(e) {
        const value = e.target.value.toLowerCase();
        if (this.isColorTypeValid(value)) {
            this.setState((prevState, props) => {
                prevState.color = value;
                return prevState;
            });
        }

        if (this.isColorValid(value)) {
            this.setState((prevState, props) => {
                prevState.colorValid = value;
                return prevState;
            });
            this.props.onUpdate({color: value});
        }
    }

    /**
     * When the input lose the focus
     * @param e
     */
    handleBlur(e) {
        if (this.state.color !== this.state.colorValid) {
            this.setState((prevState, props) => {
                prevState.color = prevState.colorValid;
                return prevState;
            });
        }
    }

    /**
     * Get back the default color
     * @param e
     */
    handleResetDefaultColor(e) {
        this.setState({color: this.props.defaultColor, colorValid: this.props.defaultColor});
        this.props.onUpdate({color: this.props.defaultColor});
    }

    /**
     * Apply this color for all the points
     * @param e
     */
    handleApplyAll(e) {
        e.preventDefault();
        this.props.onApplyAll({color: this.state.color});
    }

    /**
     * Use this color as default
     * @param e
     */
    handleUseDefaultColor(e) {
        e.preventDefault();
        this.props.onUpdateDefaultColor(this.state.color);
    }

    /**
     * Is the color typed valid?
     * @param color
     */
    isColorTypeValid(color) {
        const regex = /^#[0-9a-f]{0,6}$/i;
        return regex.test(color);
    }

    /**
     * Is the color valid?
     * @param color
     */
    isColorValid(color) {
        const regex = /^#[0-9a-f]{6}$/i;
        return regex.test(color);
    }

    render() {
        const style = {
            backgroundColor: this.state.colorValid
        };

        const styleInput = {
            color: (this.state.colorValid !== this.state.color) ? 'red' : 'inherit'
        };

        return (
            <div>
                <div className="form-line">
                    <label>Color</label>
                    <span className="form-field">
                        <span className="preview-color" style={style}/>

                        <input type="text" onChange={this.handleChange} onBlur={this.handleBlur}
                               value={this.state.color} style={styleInput}
                               className="graph-editor-toolbar-color-input"/>

                        {this.state.color !== this.props.defaultColor &&
                        <i className="fa fa-history icon" aria-hidden="true" title="Use the default color"
                           onClick={this.handleResetDefaultColor}></i>
                        }
                    </span>
                </div>

                {this.state.colorValid === this.state.color && this.props.allColor !== this.state.color &&
                <p className="graph-editor-toolbar-link"><a href="#" onClick={this.handleApplyAll}>Apply all</a></p>
                }

                {this.state.colorValid === this.state.color && this.props.defaultColor !== this.state.color &&
                <p className="graph-editor-toolbar-link"><a href="#" onClick={this.handleUseDefaultColor}>Use this color
                    as
                    default</a></p>
                }
            </div>
        );
    }
}

export default GraphEditorToolBarColor;
