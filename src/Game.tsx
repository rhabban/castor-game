import React, {useEffect, useState} from 'react';
import './App.css';
import Ressources from "./components/Ressources";
import Buildings from "./components/Buildings";
import {store} from "./redux/redux";
import {Provider} from "react-redux";
import {useAppDispatch, useAppSelector} from "./redux/hooks";

function App() {

    const buildingList = useAppSelector((state) => state.building);
    const dispatch = useAppDispatch();


    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    const [turn, setTurn] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);


    useEffect(() => {
        console.log("App render");
        //initList();
    }, []);

    const handleStartStop = () => {
        setIsRunning(!isRunning);

        /*if (!isRunning && intervalId) {
            clearInterval(intervalId);
        } else {
            const newIntervalId = setInterval(() => {
                let ressourceMapTmp = new Map<RessourceTypeEnum, number>(refRessourceMap.current);
                console.log("Old refRessourceMap", ressourceMapTmp);

                /*buildingList.forEach(building => {
                    if (building.isEnabled) {
                        const availableStockIn: number = ressourceMapTmp.get(building.ressourceTypeIn) || 0;
                        const availableStockOut: number = ressourceMapTmp.get(building.ressourceTypeOut) || 0;
                        ressourceMapTmp.set(building.ressourceTypeIn, availableStockIn - building.quantityIn);
                        //console.log("IN " + building.name + " -" + building.quantityIn + ":" + building.ressourceTypeIn)
                        ressourceMapTmp.set(building.ressourceTypeOut, availableStockOut + building.quantityOut);
                        //console.log("OUT " + building.name + " +" + building.quantityOut + ":" + building.ressourceTypeOut)
                    }
                })
                console.log("New ressourceMapTmp", ressourceMapTmp);
                setRessourceMap(ressourceMapTmp);
                console.log("New ressourceMap", ressourceMap);
                setTurn(prevTurn => prevTurn + 1);
            }, 2500);
            setIntervalId(newIntervalId);
        }
        clearInterval(intervalId);*/

    }
    const handleTurn = () => {
        buildingList.forEach(building => {
            if (building.isEnabled) {
                dispatch({
                    type: "ressource/incrementRessource",
                    payload: {
                        ressourceType: building.ressourceTypeOut,
                        value: building.quantityOut
                    }
                })
            }
        })
    }

    return (
        <Provider store={store}>
            <div className="container">
                <Ressources/>
                <Buildings/>
                <div className="container">
                    <button onClick={() => {
                        handleTurn()
                    }}>Fin du tour
                    </button>
                </div>
                <div className="container">
                    <button onClick={handleStartStop}> {isRunning ? 'Stop' : 'Start'} tour {turn} </button>
                </div>
            </div>
        </Provider>
    );
}

export default App;
