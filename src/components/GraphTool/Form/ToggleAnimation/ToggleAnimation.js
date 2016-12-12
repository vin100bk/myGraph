import React, { Component } from 'react';

import './ToggleAnimation.css';

class ToggleAnimation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: (this.props.isAnimation) ? this.props.isAnimation : false,
            start: (this.props.animationStart) ? this.props.animationStart : 0,
            duration: (this.props.animationDuration) ? this.props.animationDuration : 1
        };

        this.handleToggleChange = this.handleToggleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
        this.handleBlurNumber = this.handleBlurNumber.bind(this);
    }

    /**
     * Get the default state
     * @param props
     * @returns {{toggle: *, start: *, duration: *}}
     */
    getDefaultState(props) {
        return {
            toggle: (props.isAnimation) ? props.isAnimation : false,
            start: (props.animationStart) ? props.animationStart : 0,
            duration: (props.animationDuration) ? props.animationDuration : 1
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState(this.getDefaultState(nextProps));
        }
    }

    /**
     * When the toggle changes
     * @param e
     */
    handleToggleChange(e) {
        const isChecked = e.target.checked;
        this.setState((prevState, props) => {
            prevState.toggle = isChecked;

            this.notifyChange(prevState);

            return prevState;
        });
    }

    /**
     * When the start field changes
     * @param e
     */
    handleChangeStart(e) {
        const value = e.target.value;
        const regex = /^[0-9]{0,4}$/;
        if (regex.test(value)) {
            this.setState((prevState, props) => {
                prevState.start = value;

                this.notifyChange(prevState);

                return prevState;
            });
        }
    }

    /**
     * When the duration field changes
     * @param e
     */
    handleChangeDuration(e) {
        const value = e.target.value;
        const regex = /^[0-9]{0,2}$/;
        if (regex.test(value)) {
            this.setState((prevState, props) => {
                prevState.duration = value;

                this.notifyChange(prevState);

                return prevState;
            });
        }
    }

    /**
     * When a number input lose the focus
     * @param e
     * @param propState
     */
    handleBlurNumber(e, propState) {
        const value = e.target.value;
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) {
            this.setState((prevState, props) => {
                prevState[propState] = 0;

                this.notifyChange(prevState);

                return prevState;
            });
        }
    }

    /**
     * Notify the change
     * @param state the current state
     */
    notifyChange(state) {
        if (this.props.onUpdate) {
            this.props.onUpdate({
                animation: state.toggle,
                animationStart: state.start,
                animationDuration: state.duration
            });
        }
    }

    render() {
        return (
            <div>
                <div className="form-line">
                    <label>Animation</label>

                    <div className="form-field">
                        <label className="toggle-wrapper">
                            <input type="checkbox" onChange={this.handleToggleChange} checked={this.state.toggle}/>

                            <div className="toggle"></div>
                        </label>
                    </div>
                </div>

                {this.state.toggle &&
                <div className="form-subline">
                    <div className="form-line">
                        <label>Start after</label>
                    <span className="form-field">
                        <input type="number" value={this.state.start} onChange={this.handleChangeStart}
                               onBlur={(e) => this.handleBlurNumber(e, 'start')}/>
                        s
                    </span>
                    </div>
                    <div className="form-line">
                        <label>During</label>

                    <span className="form-field">
                        <input type="number" value={this.state.duration} onChange={this.handleChangeDuration}
                               onBlur={(e) => this.handleBlurNumber(e, 'duration')}/>
                        s
                    </span>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default ToggleAnimation;
