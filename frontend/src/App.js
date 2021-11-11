import React, { useContext } from 'react';
import NavBar from './components/NavBar';
import Emails from './components/Emails';

const App = () => {
    return (
        <div id="app">
            <NavBar />
            <Emails />
        </div>
    );
}

export default App;