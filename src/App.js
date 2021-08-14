import React from 'react';
import './App.css';

import Main from './components/Main';
import Header from './components/Header';
import AdSense from './components/Adsense';

function App() {
    return (
        <div>
            <AdSense/>
            <Header />
            <Main />
        </div>
    );
}

export default App;