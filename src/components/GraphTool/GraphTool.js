import React, { Component } from 'react';

import './GraphTool.css';

import GraphEditor from './GraphEditor/GraphEditor';
import GraphVisualization from './GraphVisualization/GraphVisualization';
import GraphToolBar from './GraphToolBar/GraphToolBar';

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
        this.handleNewGraph = this.handleNewGraph.bind(this);
        this.handleCopyGraph = this.handleCopyGraph.bind(this);
        this.handleLoadHistory = this.handleLoadHistory.bind(this);
        this.handleRenameHistory = this.handleRenameHistory.bind(this);
        this.handleDeleteHistory = this.handleDeleteHistory.bind(this);
        this.handleEmptyHistory = this.handleEmptyHistory.bind(this);

        let hist = localStorage.getItem('history');
        if (hist) {
            hist = JSON.parse(hist);
        } else {
            hist = {};
        }

        this.state = {
            points: this.props.points,
            links: this.computeLinksInfos(this.props.links, this.props.points),
            history: hist,
            currentHistoryName: null
        };
    }

    /**
     * Add a point
     * @param x
     * @param y
     */
    handleAddPoint(x, y) {
        this.setState((prevState, props) => {
            const name = this.getNextPointName(prevState.points);
            prevState.points[name] = {name: name, x: x, y: y};

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
            const pointName = point.props.point.name;

            // Delete the point
            delete prevState.points[pointName];

            // Delete the links
            for (const name of Object.keys(prevState.links)) {
                let link = prevState.links[name];

                if (parseInt(link.from, 10) === pointName || parseInt(link.to, 10) === pointName) {
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

                if (parseInt(link.from, 10) === point.name || parseInt(link.to, 10) === point.name) {
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
     */
    handleAddLink(from, to) {
        if (from.props.point.name === to.props.point.name) {
            throw new Error('Cannot insert a link between a same point');
        }

        if ((from.props.point.name + '-' + to.props.point.name) in this.state.links || (to.props.point.name + '-' + from.props.point.name) in this.state.links) {
            throw new Error('There can be only one link between two points');
        }

        this.setState((prevState, props) => {
            prevState.links[from.props.point.name + '-' + to.props.point.name] = this.computeLinkInfos({
                from: from.props.point.name,
                to: to.props.point.name
            }, prevState.points);

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
            const linkName = link.props.link.from + '-' + link.props.link.to;

            // Delete the link
            delete prevState.links[linkName];

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
            prevState.currentHistoryName = null;
            return prevState;
        });
    }

    /**
     * Create a new graph from the current one
     */
    handleCopyGraph() {
        this.setState((prevState, props) => {
            prevState.points = (JSON.parse(JSON.stringify(prevState.points)));
            prevState.links = (JSON.parse(JSON.stringify(prevState.links)));
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
            links: state.links
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
     * Load an history
     * @param history
     */
    handleLoadHistory(history) {
        this.setState((prevState, props) => {
            prevState.points = history.points;
            prevState.links = history.links;
            prevState.currentHistoryName = history.name;
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
        this.setState({
            points: {},
            links: {},
            history: {},
            currentHistoryName: null
        });

        this.storeHistory({});
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
            return 1;
        } else {
            const keys = Object.keys(points);
            return parseInt(keys[keys.length - 1], 10) + 1;
        }
    }

    render() {
        return (
            <section id="graph-tool">
                <GraphToolBar points={this.state.points} links={this.state.links} history={this.state.history}
                              currentHistoryRow={this.state.currentHistoryName}
                              onNewGraph={this.handleNewGraph} onCopyGraph={this.handleCopyGraph}
                              onClickHistoryRow={this.handleLoadHistory}
                              onRenameHistoryRow={this.handleRenameHistory}
                              onDeleteHistoryRow={this.handleDeleteHistory}
                              onEmptyHistory={this.handleEmptyHistory}/>

                <GraphEditor onAddPoint={this.handleAddPoint} onDeletePoint={this.handleDeletePoint}
                             onUpdatePoint={this.handleUpdatePoint} onAddLink={this.handleAddLink}
                             onDeleteLink={this.handleDeleteLink} points={this.state.points} links={this.state.links}/>

                <GraphVisualization points={this.state.points} links={this.state.links}/>
            </section>
        );
    }
}

export default GraphTool;
