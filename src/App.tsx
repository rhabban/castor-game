import React, {useEffect} from 'react';
import './App.css';
import {Provider} from "react-redux";
import Game from "./Game";
import {store} from "./store/Store";


function App() {

    useEffect(() => {
        console.log("App render");
    }, []);

    return (
        <Provider store={store}>
            <Game/>
        </Provider>
    );
}

export default App;
