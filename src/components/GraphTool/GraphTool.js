import React, { Component } from 'react';

import './GraphTool.css';

import GraphEditor from './GraphEditor/GraphEditor';
import GraphVisualization from './GraphVisualization/GraphVisualization';
import GraphToolMenu from './GraphToolMenu/GraphToolMenu';

/**
 * Tool which allows to build some graphs
 */
class GraphTool extends Component {
    constructor(props) {
        super(props);

        this.handleAddPoint = this.handleAddPoint.bind(this);
        this.handleDeletePoint = this.handleDeletePoint.bind(this);
        this.handleUpdatePoint = this.handleUpdatePoint.bind(this);
        this.handleAddLink = this.handleAddLink.bind(this);
        this.handleDeleteLink = this.handleDeleteLink.bind(this);
        this.handleUpdateLink = this.handleUpdateLink.bind(this);
        this.handleAddTooltip = this.handleAddTooltip.bind(this);
        this.handleDeleteTooltip = this.handleDeleteTooltip.bind(this);
        this.handleUpdateTooltip = this.handleUpdateTooltip.bind(this);
        this.handleNewGraph = this.handleNewGraph.bind(this);
        this.handleCopyGraph = this.handleCopyGraph.bind(this);
        this.handleLoadHistory = this.handleLoadHistory.bind(this);
        this.handleRenameHistory = this.handleRenameHistory.bind(this);
        this.handleDeleteHistory = this.handleDeleteHistory.bind(this);
        this.handleEmptyHistory = this.handleEmptyHistory.bind(this);
        this.handleUpdateDefaultPointColor = this.handleUpdateDefaultPointColor.bind(this);
        this.handleUpdateDefaultLinkColor = this.handleUpdateDefaultLinkColor.bind(this);
        this.handleUpdateDefaultTooltipColor = this.handleUpdateDefaultTooltipColor.bind(this);
        this.handlePlay = this.handlePlay.bind(this);

        let hist = localStorage.getItem('history');
        if (hist) {
            hist = JSON.parse(hist);
        } else {
            hist = {};
        }

        this.state = {
            points: this.props.points ? this.props.points : {},
            links: this.props.links ? this.computeLinksInfos(this.props.links, this.props.points) : {},
            tooltips: this.props.tooltips ? this.props.tooltips : {},
            history: hist,
            currentHistoryName: null,
            defaultPointColor: '#79e0ff',
            defaultLinkColor: '#79e0ff',
            defaultTooltipColor: '#000000',
            defaultTooltipFontColor: '#ffffff'
        };
    }

    /**
     * Add a point
     * @param x
     * @param y
     * @param callback
     */
    handleAddPoint(x, y, callback) {
        this.setState((prevState, props) => {
            // Create the point
            const name = this.getNextPointName(prevState.points);
            const point = {name: name, x: x, y: y, color: this.state.defaultPointColor};
            prevState.points[name] = point;

            // Call the callback with the new point
            callback(point);

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Delete a point
     * @param point
     */
    handleDeletePoint(point) {
        this.setState((prevState, props) => {
            const pointName = point.name;

            // Delete the point
            delete prevState.points[pointName];

            // Delete the links
            for (const name of Object.keys(prevState.links)) {
                let link = prevState.links[name];

                if (link.from === pointName || link.to === pointName) {
                    delete prevState.links[name];
                }
            }

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Update a point
     * @param point
     */
    handleUpdatePoint(point) {
        this.setState((prevState, props) => {
            // Replace the point
            prevState.points[point.name] = point;

            // Update the links
            for (const name of Object.keys(prevState.links)) {
                let link = prevState.links[name];

                if (link.from === point.name || link.to === point.name) {
                    prevState.links[name] = this.computeLinkInfos(link, prevState.points);
                }
            }

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Add a link
     * @param from
     * @param to
     * @param callback
     */
    handleAddLink(from, to, callback) {
        if (from.name === to.name) {
            throw new Error('Cannot insert a link between a same point');
        }

        if ((from.name + '-' + to.name) in this.state.links || (to.name + '-' + from.name) in this.state.links) {
            throw new Error('There can be only one link between two points');
        }

        this.setState((prevState, props) => {
            // Create the link
            const link = this.computeLinkInfos({
                from: from.name,
                to: to.name,
                color: this.state.defaultLinkColor
            }, prevState.points);
            prevState.links[from.name + '-' + to.name] = link;

            // Call the callback with the new link
            callback(link);

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * On delete a link
     * @param link
     */
    handleDeleteLink(link) {
        this.setState((prevState, props) => {
            // Delete the link
            delete prevState.links[link.name];

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Update a link
     * @param link
     */
    handleUpdateLink(link) {
        this.setState((prevState, props) => {
            // Replace the point
            prevState.links[link.name] = link;

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Add a tooltip
     * @param x
     * @param y
     * @param callback
     */
    handleAddTooltip(x, y, callback) {
        this.setState((prevState, props) => {
            // Create the tooltip
            const name = this.getNextTooltipName(prevState.tooltips);
            const tooltip = {
                name: name,
                x: x,
                y: y,
                color: this.state.defaultTooltipColor,
                fontColor: this.state.defaultTooltipFontColor,
                text: 'My toolip !'
            };
            prevState.tooltips[name] = tooltip;

            // Call the callback with the new tooltip
            callback(tooltip);

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Delete a tooltip
     * @param tooltip
     */
    handleDeleteTooltip(tooltip) {
        this.setState((prevState, props) => {
            // Delete the tooltip
            delete prevState.tooltips[tooltip.name];

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Update a tooltip
     * @param tooltip
     */
    handleUpdateTooltip(tooltip) {
        this.setState((prevState, props) => {
            // Replace the tooltip
            prevState.tooltips[tooltip.name] = tooltip;

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Create a new graph
     */
    handleNewGraph() {
        this.setState((prevState, props) => {
            prevState.points = {};
            prevState.links = {};
            prevState.tooltips = {};
            prevState.currentHistoryName = null;
            return prevState;
        });
    }

    /**
     * Create a new graph from the current one
     */
    handleCopyGraph() {
        this.setState((prevState, props) => {
            prevState.points = Object.assign({}, prevState.points);
            prevState.links = Object.assign({}, prevState.links);
            prevState.tooltips = Object.assign({}, prevState.tooltips);
            prevState.currentHistoryName = null;

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Get a uniq name for the history
     * @param state
     * @returns {string}
     */
    getNewHistoryName(state) {
        let history = state.history;
        let i = 0;

        do {
            i++;
        } while (('graph-' + i) in history);

        return 'graph-' + i;
    }

    /**
     * Load an history
     * @param history
     */
    handleLoadHistory(history) {
        this.setState((prevState, props) => {
            prevState.points = history.points;
            prevState.links = history.links;
            prevState.tooltips = history.tooltips;
            prevState.currentHistoryName = history.name;
            prevState.defaultPointColor = history.defaultPointColor;
            prevState.defaultLinkColor = history.defaultLinkColor;
            prevState.defaultTooltipColor = history.defaultTooltipColor;
            prevState.defaultTooltipFontColor = history.defaultTooltipFontColor;
            return prevState;
        });
    }

    /**
     * On rename a history row
     * @param newName
     * @param oldName
     */
    handleRenameHistory(newName, oldName) {
        this.setState((prevState, props) => {
            prevState.currentHistoryName = newName;
            prevState.history[newName] = prevState.history[oldName];
            prevState.history[newName].name = newName;
            delete prevState.history[oldName];

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * On delete a history row
     * @param name
     */
    handleDeleteHistory(name) {
        this.setState((prevState, props) => {
            prevState.points = {};
            prevState.links = {};
            prevState.tooltips = {};
            prevState.currentHistoryName = null;

            delete prevState.history[name];

            this.storeHistory(prevState.history);

            return prevState;
        });
    }

    /**
     * Empty the history
     */
    handleEmptyHistory() {
        this.setState((prevState, props) => {
            prevState.points = {};
            prevState.links = {};
            prevState.tooltips = {};
            prevState.history = {};
            prevState.currentHistoryName = null;

            return prevState;
        });

        this.storeHistory({});
    }

    /**
     * Update the default color point
     * @param color
     */
    handleUpdateDefaultPointColor(color) {
        this.setState((prevState, props) => {
            prevState.defaultPointColor = color;

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Update the default link point
     * @param color
     */
    handleUpdateDefaultLinkColor(color) {
        this.setState((prevState, props) => {
            prevState.defaultLinkColor = color;

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Update the default tooltip point
     * @param color
     * @param fontColor
     */
    handleUpdateDefaultTooltipColor(color, fontColor) {
        this.setState((prevState, props) => {
            prevState.defaultTooltipColor = color;
            prevState.defaultTooltipFontColor = fontColor;

            this.saveInHistory(prevState);

            return prevState;
        });
    }

    /**
     * Play the animations
     */
    handlePlay() {
        this.graphVisualization.play();
    }

    /**
     * Save the current graph in history
     * @param state
     */
    saveInHistory(state) {
        let histName = state.currentHistoryName;

        if (histName === null) {
            // New history row
            histName = this.getNewHistoryName(state);
            state.currentHistoryName = histName;
        }

        state.history[histName] = {
            name: histName,
            lastModification: Date.now(),
            points: state.points,
            links: state.links,
            tooltips: state.tooltips,
            defaultPointColor: state.defaultPointColor,
            defaultLinkColor: state.defaultLinkColor,
            defaultTooltipColor: state.defaultTooltipColor,
            defaultTooltipFontColor: state.defaultTooltipFontColor
        };

        this.storeHistory(state.history);
    }

    /**
     * Store the history
     * @param history
     */
    storeHistory(history) {
        localStorage.setItem('history', JSON.stringify(history));
    }

    /**
     * Compute information for all links
     * @param links
     * @param points
     */
    computeLinksInfos(links, points) {
        for (const name of Object.keys(links)) {
            links[name] = this.computeLinkInfos(links[name], points);
        }

        return links;
    }

    /**
     * Compute information for one link
     * @param link
     * @param points
     */
    computeLinkInfos(link, points) {
        if (!(link.from in points)) {
            throw new Error('The point ' + link.from + ' does not exist');
        }
        if (!(link.to in points)) {
            throw new Error('The point ' + link.to + ' does not exist');
        }

        const from = points[link.from];
        const to = points[link.to];

        link.name = link.from + '-' + link.to;
        link.angle = Math.atan((to.y - from.y) / (to.x - from.x));
        link.width = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
        link.x = Math.min(from.x, to.x) - ((link.width / 2) - (Math.cos(link.angle) * (link.width / 2))) + 9;
        link.y = (from.y + to.y) / 2 + 5;

        return link;
    }

    /**
     * Get the next point name (incremental way)
     * @param points
     * @returns {*}
     */
    getNextPointName(points) {
        if (Object.keys(points).length === 0) {
            return '1';
        } else {
            const keys = Object.keys(points);
            return (parseInt(keys[keys.length - 1], 10) + 1).toString();
        }
    }

    /**
     * Get the next tooltip name (incremental way)
     * @param tooltips
     * @returns {*}
     */
    getNextTooltipName(tooltips) {
        if (Object.keys(tooltips).length === 0) {
            return 't1';
        } else {
            const keys = Object.keys(tooltips);
            return 't' + (parseInt(keys[keys.length - 1].substr(1), 10) + 1).toString();
        }
    }

    render() {
        return (
            <section id="graph-tool">
                <GraphToolMenu points={this.state.points} links={this.state.links} tooltips={this.state.tooltips}
                               history={this.state.history}
                               currentHistoryRow={this.state.currentHistoryName}
                               onNewGraph={this.handleNewGraph} onCopyGraph={this.handleCopyGraph}
                               onClickHistoryRow={this.handleLoadHistory}
                               onRenameHistoryRow={this.handleRenameHistory}
                               onDeleteHistoryRow={this.handleDeleteHistory}
                               onEmptyHistory={this.handleEmptyHistory} onPlay={this.handlePlay}/>

                <GraphEditor onAddPoint={this.handleAddPoint} onDeletePoint={this.handleDeletePoint}
                             onUpdatePoint={this.handleUpdatePoint} onAddLink={this.handleAddLink}
                             onDeleteLink={this.handleDeleteLink} onUpdateLink={this.handleUpdateLink}
                             onAddTooltip={this.handleAddTooltip} onDeleteTooltip={this.handleDeleteTooltip}
                             onUpdateTooltip={this.handleUpdateTooltip}
                             points={this.state.points} links={this.state.links} tooltips={this.state.tooltips}
                             defaultPointColor={this.state.defaultPointColor}
                             defaultLinkColor={this.state.defaultLinkColor}
                             defaultTooltipColor={this.state.defaultTooltipColor}
                             defaultTooltipFontColor={this.state.defaultTooltipFontColor}
                             onUpdateDefaultPointColor={this.handleUpdateDefaultPointColor}
                             onUpdateDefaultLinkColor={this.handleUpdateDefaultLinkColor}
                             onUpdateDefaultTooltipColor={this.handleUpdateDefaultTooltipColor}/>

                <GraphVisualization points={this.state.points} links={this.state.links} tooltips={this.state.tooltips}
                                    ref={(graphViz) => { this.graphVisualization = graphViz; }}/>
            </section>
        );
    }
}

export default GraphTool;
