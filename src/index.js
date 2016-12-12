import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './form.css';

import GraphTool from './components/GraphTool/GraphTool';

let points = {
    // Triangle
    1: {name: '1', x: 10, y: 250, color: '#79e0ff'},
    2: {name: '2', x: 200, y: 10, color: '#79e0ff'},
    3: {name: '3', x: 205, y: 200, color: '#79e0ff'},

    // Chart
    4: {name: '4', x: 401, y: 232, color: '#ff0000', animation: true, animationStart: 1, animationDuration: 1},
    5: {name: '5', x: 476, y: 116, color: '#ff0000', animation: true, animationStart: 2, animationDuration: 1},
    6: {name: '6', x: 536, y: 184, color: '#ff0000', animation: true, animationStart: 3, animationDuration: 1},
    7: {name: '7', x: 620, y: 36, color: '#ff0000', animation: true, animationStart: 4, animationDuration: 1},
    8: {name: '8', x: 713, y: 146, color: '#ff0000', animation: true, animationStart: 5, animationDuration: 1},
    9: {name: '9', x: 758, y: 80, color: '#ff0000', animation: true, animationStart: 6, animationDuration: 1},
    10: {name: '10', x: 864, y: 227, color: '#ff0000', animation: true, animationStart: 7, animationDuration: 1}
};

let links = {
    // Triangle
    '1-2': {name: '1-2', from: '1', to: '2', color: '#79e0ff'},
    '2-3': {name: '2-3', from: '2', to: '3', color: '#79e0ff'},
    '1-3': {name: '1-3', from: '1', to: '3', color: '#79e0ff'},

    // Chart
    '4-5': {name: '4-5', from: '4', to: '5', color: '#ff9999', animation: true, animationStart: 1, animationDuration: 1},
    '5-6': {name: '5-6', from: '5', to: '6', color: '#ff9999', animation: true, animationStart: 2, animationDuration: 1},
    '6-7': {name: '6-7', from: '6', to: '7', color: '#ff9999', animation: true, animationStart: 3, animationDuration: 1},
    '7-8': {name: '7-8', from: '7', to: '8', color: '#ff9999', animation: true, animationStart: 4, animationDuration: 1},
    '8-9': {name: '8-9', from: '8', to: '9', color: '#ff9999', animation: true, animationStart: 5, animationDuration: 1},
    '9-10': {name: '9-10', from: '9', to: '10', color: '#ff9999', animation: true, animationStart: 6, animationDuration: 1}
};

let tooltips = {
    't1': {name: 't1', x: 456, y: 85, text: 'First step', color: '#000000', fontColor: '#ffffff', animation: true, animationStart: 2, animationDuration: 1},
    't2': {name: 't2', x: 878, y: 192, text: 'Final step', color: '#000000', fontColor: '#ffffff', animation: true, animationStart: 6, animationDuration: 1},
};

ReactDOM.render(
    <GraphTool points={points} links={links} tooltips={tooltips}/>,
    document.getElementById('root')
);
