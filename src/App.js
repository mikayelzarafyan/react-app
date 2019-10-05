import React from 'react';
import './App.css';
import './main.scss';
import JobsWrapper from './components/JobsWrapper';
import ColorBox from './components/ColorBox';

function App() {
    return (
        <div className="App">
            <ColorBox />
            <JobsWrapper />
        </div>
    );
}

export default App;
