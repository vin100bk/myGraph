import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import GraphTool from './components/GraphTool/GraphTool';

var points = {
    1: {x: 10, y: 250},
    2: {x: 200, y: 10},
    3: {x: 205, y: 200}
};

var links = [
    {from: '1', to: '2'},
    {from: '2', to: '3'},
    {from: '1', to: '3'}
];


ReactDOM.render(
    <GraphTool points={points} links={links}/>,
    document.getElementById('root')
);
