import React, { Component } from 'react';

import './GraphEditor.css';

import GraphEditorToolBar from './GraphEditorToolBar/GraphEditorToolBar';
import EditingPoint from '../EditingPoint/EditingPoint';
import Link from '../Link/Link';


class GraphEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {pointSelected: null, linkSelected: null};

        this.handleClick = this.handleClick.bind(this);
        this.handleClickPoint = this.handleClickPoint.bind(this);
        this.handleClickLink = this.handleClickLink.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleUpdatePoint = this.handleUpdatePoint.bind(this);
        this.handleUpdateLink = this.handleUpdateLink.bind(this);
        this.handleApplyAllPoints = this.handleApplyAllPoints.bind(this);
        this.handleApplyAllLinks = this.handleApplyAllLinks.bind(this);

        document.onkeydown = function (event) {
            if (document.activeElement === document.body) {
                if (event.keyCode === 27) {
                    // Escape
                    event.preventDefault();
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
                    event.preventDefault();
                    let point = this.state.pointSelected;
                    if (event.keyCode === 37) {
                        // Left
                        if ((point.x) <= 0) {
                            return;
                        }

                        point.x--;
                    } else if (event.keyCode === 38) {
                        // Top
                        if ((point.y) <= 0) {
                            return;
                        }

                        point.y--;
                    } else if (event.keyCode === 39) {
                        // Right
                        if ((point.x + 18) >= Math.floor(this.coordinatesPanel.width)) {
                            return;
                        }

                        point.x++;
                    } else if (event.keyCode === 40) {
                        // Down
                        if ((point.y + 18) >= Math.floor(this.coordinatesPanel.height)) {
                            return;
                        }

                        point.y++;
                    }

                    this.props.onUpdatePoint(point);

                    // Display the coordinates
                    this.hideCoordinates();
                    this.displayCoordinates(Math.round(point.x) + 9, Math.round(point.y) + 9);
                }
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
        if (this.props.points !== nextProps.points || this.props.links !== nextProps.links) {
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
        if (this.state.pointSelected === null && this.state.linkSelected === null) {
            const x = e.pageX - this.coordinatesPanel.left - 9;
            const y = e.pageY - this.coordinatesPanel.top - 9;
            this.props.onAddPoint(x, y, function (point) {
                this.handleClickPoint(point);
            }.bind(this));
        } else {
            this.handleEscape();
        }
    }

    /**
     * On click on a point
     * @param point
     */
    handleClickPoint(point) {
        if (this.state.pointSelected) {
            // A point is already selected
            if (this.state.pointSelected !== point) {
                try {
                    this.props.onAddLink(this.state.pointSelected, point, function (link) {
                        this.handleClickLink(link);
                    }.bind(this));
                    this.handleEscape();
                } catch (e) {
                    alert(e);
                }
            }
        } else {
            // No point selected
            this.handleEscape();
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
        this.setState((prevState, props) => {
            prevState.linkSelected = link;
            return prevState;
        });
    }

    /**
     * On press on the escape key
     */
    handleEscape() {
        this.setState({pointSelected: null, linkSelected: null});
        this.hideCoordinates();
    }

    /**
     * On delete a point
     * @param point
     */
    handleDeletePoint(point) {
        if (confirm('Are you sure to delete this point? It will also delete all the associated links')) {
            this.props.onDeletePoint(point);
            this.setState({pointSelected: null, linkSelected: null});
        }
    }

    /**
     * On delete a link
     * @param link
     */
    handleDeleteLink(link) {
        if (confirm('Are you sure to delete this link?')) {
            this.props.onDeleteLink(link);
            this.setState({pointSelected: null, linkSelected: null});
        }
    }

    /**
     * When a point is dragged
     * @param e
     */
    handleDragOver(e) {
        if (e.pageX >= this.coordinatesPanel.left + 9 && e.pageX <= this.coordinatesPanel.right - 9
            && e.pageY >= this.coordinatesPanel.top + 9 && e.pageY <= this.coordinatesPanel.bottom - 9) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";

            // Display the coordinates
            this.hideCoordinates();
            this.displayCoordinates(Math.round(e.pageX - this.coordinatesPanel.left), Math.round(e.pageY));
        }
    }

    /**
     * When a point is drop after a drag
     * @param e
     */
    handleDrop(e) {
        e.preventDefault();
        let point = e.dataTransfer.getData('Point');
        if (point !== '') {
            point = JSON.parse(point);
            point.x = e.pageX - this.coordinatesPanel.left - 9;
            point.y = e.pageY - this.coordinatesPanel.top - 9;
            this.props.onUpdatePoint(point);

            // Disable the coordinate links, related to the CoordPoint component but I did not find any solution
            let lines = document.getElementsByClassName('graph-dot-coordinates');
            for (let i = 0; i < lines.length; i++) {
                lines[i].style.display = 'none';
            }
        }
    }

    /**
     * When updating a point with the toolbar
     * @param props
     */
    handleUpdatePoint(props) {
        this.updatePoint(this.state.pointSelected, props);
    }

    /**
     * When updating a link with the toolbar
     * @param props
     */
    handleUpdateLink(props) {
        this.updateLink(this.state.linkSelected, props);
    }

    /**
     * Apply some properties to all the points
     * @param props
     */
    handleApplyAllPoints(props) {
        for (const name of Object.keys(this.props.points)) {
            let point = this.props.points[name];
            this.updatePoint(point, props);
        }
    }

    /**
     * Apply some properties to all the links
     * @param props
     */
    handleApplyAllLinks(props) {
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            this.updateLink(link, props);
        }
    }

    /**
     * Update a point
     * @param point
     * @param props
     */
    updatePoint(point, props) {
        let p = Object.assign({}, point, props);
        this.props.onUpdatePoint(p);
    }

    /**
     * Update a link
     * @param link
     * @param props
     */
    updateLink(link, props) {
        let l = Object.assign(link, props);
        this.props.onUpdateLink(l);
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
            children.push(<EditingPoint key={name} point={point}
                                        isSelected={this.state.pointSelected && this.state.pointSelected.name === name}
                                        onClick={this.handleClickPoint}
                                        onMouseOver={this.handleHoverPoint} onMouseOut={this.handleOutPoint}
                                        onDragStart={this.handleDragStart}/>);
        }

        // Links
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            children.push(<Link key={name} link={link}
                                isSelected={this.state.linkSelected && this.state.linkSelected.name === name}
                                onClick={this.handleClickLink}/>);
        }

        let panelClass = '';
        if (this.state.pointSelected) {
            panelClass = 'point-selected';
        } else if (this.state.linkSelected) {
            panelClass = 'link-selected';
        }

        return (
            <section id="graph-editor">
                {(this.state.pointSelected || this.state.linkSelected) &&
                <GraphEditorToolBar points={this.props.points} links={this.props.links} point={this.state.pointSelected}
                                    link={this.state.linkSelected}
                                    defaultPointColor={this.props.defaultPointColor}
                                    defaultLinkColor={this.props.defaultLinkColor}
                                    onUpdatePoint={this.handleUpdatePoint} onUpdateLink={this.handleUpdateLink}
                                    onApplyAllPoints={this.handleApplyAllPoints}
                                    onApplyAllLinks={this.handleApplyAllLinks}
                                    onUpdateDefaultPointColor={this.props.onUpdateDefaultPointColor}
                                    onUpdateDefaultLinkColor={this.props.onUpdateDefaultLinkColor}/>
                }

                <h1>Graph editor</h1>

                <div id="graph-editor-panel" className={panelClass}
                     onClick={this.handleClick} onMouseMove={this.handleMouseMove} onDragOver={this.handleDragOver}
                     onDrop={this.handleDrop}>
                    {children}
                </div>
            </section>
        );
    }
}

export default GraphEditor;
