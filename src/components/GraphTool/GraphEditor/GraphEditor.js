import React, { Component } from 'react';

import './GraphEditor.css';

import GraphEditorToolBar from './GraphEditorToolBar/GraphEditorToolBar';
import GraphEditorTools from './GraphEditorTools/GraphEditorTools';
import EditingPoint from '../EditingPoint/EditingPoint';
import Link from '../Link/Link';
import Tooltip from '../Tooltip/Tooltip';

class GraphEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {pointSelected: null, linkSelected: null, tooltipSelected: null, editingMode: 'point'};

        this.handleClick = this.handleClick.bind(this);
        this.handleClickPoint = this.handleClickPoint.bind(this);
        this.handleClickLink = this.handleClickLink.bind(this);
        this.handleClickTooltip = this.handleClickTooltip.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleUpdatePoint = this.handleUpdatePoint.bind(this);
        this.handleUpdateLink = this.handleUpdateLink.bind(this);
        this.handleUpdateTooltip = this.handleUpdateTooltip.bind(this);
        this.handleApplyAllPoints = this.handleApplyAllPoints.bind(this);
        this.handleApplyAllLinks = this.handleApplyAllLinks.bind(this);
        this.handleApplyAllTooltips = this.handleApplyAllTooltips.bind(this);
        this.handleChangeEditingMode = this.handleChangeEditingMode.bind(this);

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
                    } else if (this.state.tooltipSelected) {
                        this.handleDeleteTooltip(this.state.tooltipSelected);
                    }
                } else if ((this.state.pointSelected || this.state.tooltipSelected) && event.keyCode >= 37 && event.keyCode <= 40) {
                    // Arrow
                    event.preventDefault();
                    let entity = (this.state.pointSelected) ? this.state.pointSelected : this.state.tooltipSelected;
                    let offsetX = (this.state.pointSelected) ? 18 : 50;
                    let offsetY = (this.state.pointSelected) ? 18 : 20;
                    if (event.keyCode === 37) {
                        // Left
                        if ((entity.x) <= 0) {
                            return;
                        }

                        entity.x--;
                    } else if (event.keyCode === 38) {
                        // Top
                        if ((entity.y) <= 0) {
                            return;
                        }

                        entity.y--;
                    } else if (event.keyCode === 39) {
                        // Right
                        if ((entity.x + offsetX) >= Math.floor(this.coordinatesPanel.width)) {
                            return;
                        }

                        entity.x++;
                    } else if (event.keyCode === 40) {
                        // Down
                        if ((entity.y + offsetY) >= Math.floor(this.coordinatesPanel.height)) {
                            return;
                        }

                        entity.y++;
                    }

                    if (this.state.pointSelected) {
                        // Point
                        this.props.onUpdatePoint(entity);

                        // Display the coordinates
                        this.hideCoordinates();
                        this.displayCoordinates(Math.round(entity.x) + 9, Math.round(entity.y) + 9);
                    } else {
                        // Tooltip
                        this.props.onUpdateTooltip(entity);
                    }
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
        if (this.props.points !== nextProps.points || this.props.links !== nextProps.links || this.props.tooltips !== nextProps.tooltips) {
            this.setState((prevState, props) => {
                prevState.pointSelected = null;
                prevState.linkSelected = null;
                prevState.tooltipSelected = null;
                return prevState;
            });
        }
    }

    /**
     * When the mouse moves in the editor
     * @param e
     */
    handleMouseMove(e) {
        this.hideCoordinates();
        if (this.state.editingMode === 'point' && this.state.pointSelected === null && this.state.linkSelected === null && this.state.tooltipSelected === null) {
            this.displayCoordinates(Math.round(e.pageX - this.coordinatesPanel.left), Math.round(e.pageY));
        }
    }

    /**
     * Click in the editor besides points and links
     * @param e
     */
    handleClick(e) {
        if (this.state.pointSelected === null && this.state.linkSelected === null && this.state.tooltipSelected === null) {
            let x, y;
            switch (this.state.editingMode) {
                case 'point':
                    // Add a point
                    x = e.pageX - this.coordinatesPanel.left - 9;
                    y = e.pageY - this.coordinatesPanel.top - 9;
                    this.props.onAddPoint(x, y, function (point) {
                        this.handleClickPoint(point);
                    }.bind(this));
                    break;

                case 'tooltip':
                    // Add a tooltip
                    x = e.pageX - this.coordinatesPanel.left;
                    y = e.pageY - this.coordinatesPanel.top;
                    this.props.onAddTooltip(x, y, function (tooltip) {
                        this.handleClickTooltip(tooltip);
                    }.bind(this));
                    break;

                default:
                    throw new Error('Unknown editing mode ' + this.state.editingMode);
            }
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
     * On click on a tooltip
     * @param tooltip
     */
    handleClickTooltip(tooltip) {
        this.handleEscape();
        this.setState((prevState, props) => {
            prevState.tooltipSelected = tooltip;
            return prevState;
        });
    }

    /**
     * On press on the escape key
     */
    handleEscape() {
        this.setState((prevState, props) => {
            prevState.pointSelected = null;
            prevState.linkSelected = null;
            prevState.tooltipSelected = null;
            return prevState;
        });
        this.hideCoordinates();
    }

    /**
     * On delete a point
     * @param point
     */
    handleDeletePoint(point) {
        if (confirm('Are you sure to delete this point? It will also delete all the associated links')) {
            this.props.onDeletePoint(point);
            this.handleEscape();
        }
    }

    /**
     * On delete a link
     * @param link
     */
    handleDeleteLink(link) {
        if (confirm('Are you sure to delete this link?')) {
            this.props.onDeleteLink(link);
            this.handleEscape();
        }
    }

    /**
     * On delete a tooltip
     * @param tooltip
     */
    handleDeleteTooltip(tooltip) {
        if (confirm('Are you sure to delete this tooltip?')) {
            this.props.onDeleteTooltip(tooltip);
            this.handleEscape();
        }
    }

    /**
     * When a point is dragged
     * @param e
     */
    handleDragOver(e) {
        if (this.state.pointSelected && e.pageX >= this.coordinatesPanel.left + 9 && e.pageX <= this.coordinatesPanel.right - 9
            && e.pageY >= this.coordinatesPanel.top + 9 && e.pageY <= this.coordinatesPanel.bottom - 9) {
            // Point
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";

            // Display the coordinates
            this.hideCoordinates();
            this.displayCoordinates(Math.round(e.pageX - this.coordinatesPanel.left), Math.round(e.pageY));
        } else if (this.state.tooltipSelected && e.pageX >= this.coordinatesPanel.left && e.pageX <= this.coordinatesPanel.right - 50
            && e.pageY >= this.coordinatesPanel.top && e.pageY <= this.coordinatesPanel.bottom - 20) {
            // Tooltip
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        }
    }

    /**
     * When a point or a tooltip is dropped after a drag
     * @param e
     */
    handleDrop(e) {
        e.preventDefault();

        if (this.state.pointSelected) {
            // Point
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
        } else if (this.state.tooltipSelected) {
            // Tooltip
            let tooltip = e.dataTransfer.getData('Tooltip');
            let mouse = e.dataTransfer.getData('Mouse');
            if (tooltip !== '' && mouse !== '') {
                tooltip = JSON.parse(tooltip);
                mouse = JSON.parse(mouse);
                tooltip.x = e.pageX - this.coordinatesPanel.left + (tooltip.x - (mouse.x - this.coordinatesPanel.left));
                tooltip.y = e.pageY - this.coordinatesPanel.top + (tooltip.y - (mouse.y - this.coordinatesPanel.top));

                this.props.onUpdateTooltip(tooltip);
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
     * When updating a tooltip with the toolbar
     * @param props
     */
    handleUpdateTooltip(props) {
        this.updateTooltip(this.state.tooltipSelected, props);
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
     * Apply some properties to all the tooltips
     * @param props
     */
    handleApplyAllTooltips(props) {
        for (const name of Object.keys(this.props.tooltips)) {
            let tooltip = this.props.tooltips[name];
            this.updateTooltip(tooltip, props);
        }
    }

    /**
     * Change the editing mode
     * @param newMode
     */
    handleChangeEditingMode(newMode) {
        this.setState((prevState, props) => {
            prevState.editingMode = newMode;
            return prevState;
        });
    }

    /**
     * Update a point
     * @param point
     * @param props
     */
    updatePoint(point, props) {
        let p = Object.assign(point, props);
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
     * Update a tooltip
     * @param tooltip
     * @param props
     */
    updateTooltip(tooltip, props) {
        let t = Object.assign(tooltip, props);
        this.props.onUpdateTooltip(t);
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
                                        onMouseOver={this.handleHoverPoint} onMouseOut={this.handleOutPoint}/>);
        }

        // Links
        for (const name of Object.keys(this.props.links)) {
            let link = this.props.links[name];
            children.push(<Link key={name} link={link}
                                isSelected={this.state.linkSelected && this.state.linkSelected.name === name}
                                onClick={this.handleClickLink}/>);
        }

        // Tooltips
        for (const name of Object.keys(this.props.tooltips)) {
            let tooltip = this.props.tooltips[name];
            children.push(<Tooltip key={name} tooltip={tooltip} draggable="true"
                                   isSelected={this.state.tooltipSelected && this.state.tooltipSelected.name === name}
                                   onClick={this.handleClickTooltip} onUpdate={this.handleUpdateTooltip}/>);
        }

        let panelClass = '';
        if (this.state.pointSelected) {
            panelClass = 'point-selected';
        } else if (this.state.linkSelected) {
            panelClass = 'link-selected';
        } else if (this.state.tooltipSelected) {
            panelClass = 'tooltip-selected';
        }

        return (
            <section id="graph-editor">
                {(this.state.pointSelected || this.state.linkSelected || this.state.tooltipSelected) ? (
                    <GraphEditorToolBar points={this.props.points}
                                        links={this.props.links}
                                        tooltips={this.props.tooltips}
                                        point={this.state.pointSelected}
                                        link={this.state.linkSelected}
                                        tooltip={this.state.tooltipSelected}
                                        defaultPointColor={this.props.defaultPointColor}
                                        defaultLinkColor={this.props.defaultLinkColor}
                                        defaultTooltipColor={this.props.defaultTooltipColor}
                                        defaultTooltipFontColor={this.props.defaultTooltipFontColor}
                                        onUpdatePoint={this.handleUpdatePoint}
                                        onUpdateLink={this.handleUpdateLink}
                                        onUpdateTooltip={this.handleUpdateTooltip}
                                        onApplyAllPoints={this.handleApplyAllPoints}
                                        onApplyAllLinks={this.handleApplyAllLinks}
                                        onApplyAllTooltips={this.handleApplyAllTooltips}
                                        onUpdateDefaultPointColor={this.props.onUpdateDefaultPointColor}
                                        onUpdateDefaultLinkColor={this.props.onUpdateDefaultLinkColor}
                                        onUpdateDefaultTooltipColor={this.props.onUpdateDefaultTooltipColor}/>
                ) : (
                    <GraphEditorTools current={this.state.editingMode} onUpdate={this.handleChangeEditingMode}/>
                )}

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