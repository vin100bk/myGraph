import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import GraphTool from './components/GraphTool/GraphTool';

let points = {
    1: {name: 1, x: 10, y: 250},
    2: {name: 2, x: 200, y: 10},
    3: {name: 3, x: 205, y: 200}
};

let links = {
    '1-2': {from: '1', to: '2'},
    '2-3': {from: '2', to: '3'},
    '1-3': {from: '1', to: '3'}
};

ReactDOM.render(
    <GraphTool points={points} links={links}/>,
    document.getElementById('root')
);
