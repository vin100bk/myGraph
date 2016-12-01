import React, { Component } from 'react';

import './GraphEditor.css';

import CoordPoint from '../CoordPoint/CoordPoint';
import Link from '../Link/Link';

class GraphEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {pointSelected: null, linkSelected: null};

        this.handleClick = this.handleClick.bind(this);
        this.handleClickPoint = this.handleClickPoint.bind(this);
        this.handleClickLink = this.handleClickLink.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        document.onkeydown = function (event) {
            if (event.keyCode === 27) {
                // Escape
                this.handleEscape();
            } else if (event.keyCode === 8) {
                // Delete
                if (this.state.pointSelected) {
                    this.handleDeletePoint(this.state.pointSelected);
                } else if (this.state.linkSelected) {
                    this.handleDeleteLink(this.state.linkSelected);
                }
            } else if (this.state.pointSelected && event.keyCode >= 37 && event.keyCode <= 40) {
                // Arrow
                let point = this.state.pointSelected.props.point;
                if (event.keyCode === 37) {
                    // Left
                    if ((this.state.pointSelected.props.point.x + 18) <= 0) {
                        return;
                    }

                    point.x--;
                } else if (event.keyCode === 38) {
                    // Top
                    if ((this.state.pointSelected.props.point.y + 18) <= 0) {
                        return;
                    }

                    point.y--;
                } else if (event.keyCode === 39) {
                    // Right
                    if ((this.state.pointSelected.props.point.x + 18) >= Math.floor(this.coordinatesPanel.width)) {
                        return;
                    }

                    point.x++;
                } else if (event.keyCode === 40) {
                    // Down
                    if ((this.state.pointSelected.props.point.y + 18) >= Math.floor(this.coordinatesPanel.height)) {
                        return;
                    }

                    point.y++;
                }

                this.props.onUpdatePoint(point);

                // Display the coordinates
                this.hideCoordinates();
                this.displayCoordinates(Math.round(point.x) + 9, Math.round(point.y) + 9);
            }
        }.bind(this);
    }

    /**
     * When the component is mount
     */
    componentDidMount() {
        // Store it, avoid to compute it at each mouse move
        this.coordinatesPanel = document.getElementById('graph-editor-panel').getBoundingClientRect();
    }

    /**
     * When the component is updated
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if(this.props.points !== nextProps.points || this.props.links !== nextProps.links) {
            if(this.state.pointSelected) {
                this.state.pointSelected.setState({isSelected: false});
            }
            if(this.state.linkSelected) {
                this.state.linkSelected.setState({isSelected: false});
            }
            this.setState({pointSelected: null, linkSelected: null});
        }
    }

    /**
     * When the mouse moves in the editor
     * @param e
     */
    handleMouseMove(e) {
        this.hideCoordinates();
        if (this.state.pointSelected === null) {
            this.displayCoordinates(Math.round(e.pageX - this.coordinatesPanel.left), Math.round(e.pageY));
        }
    }

    /**
     * Click in the editor besides points and links
     * @param e
     */
    handleClick(e) {
        if (this.state.pointSelected === null) {
            const x = e.pageX - this.coordinatesPanel.left - 9;
            const y = e.pageY - this.coordinatesPanel.top - 9;
            this.props.onAddPoint(x, y);
        }
    }

    /**
     * On click on a point
     * @param point
     */
    handleClickPoint(point) {
        if (this.state.pointSelected) {
            // A point is already selected
            try {
                this.props.onAddLink(this.state.pointSelected, point);
                this.handleEscape();
            } catch (e) {
            }
        } else {
            // No point selected
            this.handleEscape();
            point.setState({isSelected: true});
            this.setState((prevState, props) => {
                prevState.pointSelected = point;
                return prevState;
            });
        }
    }

    /**
     * On click on a link
     * @param point
     */
    handleClickLink(link) {
        this.handleEscape();
        link.setState({isSelected: true});
        this.setState((prevState, props) => {
            prevState.linkSelected = link;
            return prevState;
        });
    }

    /**
     * On press on the escape key
     */
    handleEscape() {
        this.setState((prevState, props) => {
            if (prevState.pointSelected) {
                prevState.pointSelected.setState({isSelected: false});
            }
            if (prevState.linkSelected) {
                prevState.linkSelected.setState({isSelected: false});
            }

            return {pointSelected: null, linkSelected: null};
        });
    }

    /**
     * On delete a point
     * @param point
     */
    handleDeletePoint(point) {
        this.props.onDeletePoint(point);
        this.setState({pointSelected: null, linkSelected: null});
    }

    /**
     * On delete a link
     * @param link
     */
    handleDeleteLink(link) {
        this.props.onDeleteLink(link);
        this.setState({pointSelected: null, linkSelected: null});
    }

    /**
     * Hide the coordinates lines
     */
    hideCoordinates() {
        let lines = document.getElementsByClassName('graph-dot-coordinates');
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.visibility = 'hidden';
        }
    }

    /**
     * Display the coordinate lines
     * @param x
     * @param y
     */
    displayCoordinates(x, y) {
        let xLines = document.getElementsByClassName('graph-dot-coordinates-x-' + y + 'px');
        let yLines = document.getElementsByClassName('graph-dot-coordinates-y-' + x + 'px');

        for (let i = 0; i < xLines.length; i++) {
            xLines[i].style.visibility = 'visible';
        }

        for (let i = 0; i < yLines.length; i++) {
            yLines[i].style.visibility = 'visible';
        }
    }

    render() {
        let children = [];
        // Points
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            children.push(<CoordPoint key={name} point={point} onClick={this.handleClickPoint}
                                      onMouseOver={this.handleHoverPoint} onMouseOut={this.handleOutPoint}/>);
        }

        // Links
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            children.push(<Link key={name} link={link} onClick={this.handleClickLink}/>);
        }

        return (
            <section id="graph-editor">
                <h1>Graph editor</h1>

                <div id="graph-editor-panel" className={this.state.pointSelected ? 'point-selected' : ''}
                     onClick={this.handleClick} onMouseMove={this.handleMouseMove}>
                    {children}
                </div>
            </section>
        );
    }
}

export default GraphEditor;
