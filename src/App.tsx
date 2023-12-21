import React, {useEffect, useState} from 'react';
import './App.css';
import {Provider} from "react-redux";
import Game from "./Game";
import {store} from "./store/Store";


function App() {

    const [isGame, setIsGame] = useState(false)

    useEffect(() => {
        console.log("App render");
    }, []);


    return (
        !isGame ?
            <>
                <div className="col-12 align-self-center">
                    <button className={"btn-lg btn-success position-relative "}
                            onClick={() => setIsGame(true)}>
                        New GAME

                    </button>
                </div>
            </>
            :
            <Provider store={store}>
                <Game setEndGame={() => setIsGame(false)}/>
            </Provider>

    );
}

export default App;
