import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './form.css';

import GraphTool from './components/GraphTool/GraphTool';

let points = {
    1: {name: '1', x: 10, y: 250, color: '#79e0ff'},
    2: {name: '2', x: 200, y: 10, color: '#79e0ff'},
    3: {name: '3', x: 205, y: 200, color: '#79e0ff'}
};

let links = {
    '1-2': {name: '1-2', from: '1', to: '2', color: '#79e0ff'},
    '2-3': {name: '2-3', from: '2', to: '3', color: '#79e0ff'},
    '1-3': {name: '1-3', from: '1', to: '3', color: '#79e0ff'}
};

ReactDOM.render(
    <GraphTool points={points} links={links}/>,
    document.getElementById('root')
);
