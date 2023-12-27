import React, {useEffect, useState} from 'react';
import './App.css';
import {Provider} from "react-redux";
import Game from "./Game";
import {store} from "./store/store";


function App() {

    const [isGame, setIsGame] = useState(false)
    const [isCheatEnable, setIsCheatEnable] = useState(false)

    useEffect(() => {
        console.log("App isGame changed");
    }, [isGame]);

    const onNewGame = (isNewGame: boolean, isCheatEnable: boolean) => {
        setIsGame(isNewGame);
        setIsCheatEnable(isCheatEnable);
    };


    return (
        !isGame ?
            <>
                <div className={"container"} style={{marginTop: "100px"}}>
                    <div className={"row"}>
                        <div className="d-grid gap-2 col-4 mx-auto">
                            <button className="btn btn-lg btn-success" type="button"
                                    onClick={() => onNewGame(true, false)}>
                                New GAME

                            </button>
                        </div>
                    </div>
                </div>
                <div className={"container"} style={{marginTop: "100px"}}>
                    <div className={"row"}>
                        <div className="d-grid gap-2 col-4 mx-auto">
                            <button className="btn btn-lg btn-warning" type="button"
                                    onClick={() => onNewGame(true, true)}>
                                New GAME with cheat

                            </button>
                        </div>
                    </div>
                </div>
            </>
            :
            <Provider store={store}>
                <div style={{marginBottom: "100px", marginTop: "10px"}}>
                    <Game isCheatEnable={isCheatEnable} setEndGame={() => setIsGame(false)}/>
                </div>
            </Provider>

    );
}

export default App;
