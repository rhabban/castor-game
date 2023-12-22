import React, {useEffect, useState} from 'react';
import './App.css';
import {Provider} from "react-redux";
import Game from "./Game";
import {store} from "./store/Store";


function App() {

    const [isGame, setIsGame] = useState(false)


    useEffect(() => {
        console.log("App render");
    }, [isGame]);

    const onNewGame = (bool: boolean) => {
        setIsGame(true);
    };


    return (
        !isGame ?
            <>
                <div className={"container"} style={{marginTop: "100px"}}>
                    <div className={"row"}>
                        <div className="d-grid gap-2 col-4 mx-auto">
                            <button className="btn btn-lg btn-success" type="button"
                                    onClick={() => onNewGame(true)}>
                                New GAME

                            </button>
                        </div>
                    </div>
                </div>
            </>
            :
            <Provider store={store}>
                <Game setEndGame={() => setIsGame(false)}/>
            </Provider>

    );
}

export default App;
