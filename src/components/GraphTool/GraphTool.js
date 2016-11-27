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
        this.handleAddLink = this.handleAddLink.bind(this);

        this.state = {points: this.props.points, links: this.computeLinksInfos(this.props.links, this.props.points)};
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

            return {points: prevState.points, links: prevState.links};
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
            let i = 0;
            prevState.links.forEach(function (link) {
                if (parseInt(link.from, 10) === pointName || parseInt(link.to, 10) === pointName) {
                    delete prevState.links[i];
                }

                i++;
            });

            return prevState;
        });
    }

    handleAddLink(from, to) {
        this.setState((prevState, props) => {
            prevState.links.push(this.computeLinkInfos({
                from: from.props.point.name,
                to: to.props.point.name
            }, prevState.points));
            return prevState;
        });
    }

    /**
     * Compute information for all links
     * @param links
     * @param points
     */
    computeLinksInfos(links, points) {
        let computedLinks = [];
        links.forEach(function (link) {
            computedLinks.push(this.computeLinkInfos(link, points));
        }, this);

        return computedLinks;
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
        link.y = (from.y + to.y) / 2 + 9;

        return link;
    }

    /**
     * Get the next point name (incremental way)
     * @param points
     * @returns {*}
     */
    getNextPointName(points) {
        if (points.length === 0) {
            return 1;
        } else {
            const keys = Object.keys(points);
            return parseInt(keys[keys.length - 1], 10) + 1;
        }
    }

    render() {
        return (
            <section id="graph-tool">
                <GraphToolBar />
                <GraphEditor onAddPoint={this.handleAddPoint} onDeletePoint={this.handleDeletePoint}
                             onAddLink={this.handleAddLink} points={this.state.points} links={this.state.links}/>
                <GraphVisualization points={this.state.points} links={this.state.links}/>
            </section>
        );
    }
}

export default GraphTool;
