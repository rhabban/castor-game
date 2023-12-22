import {useAppDispatch, useAppSelector} from "../store/Hooks";
import {decrementRessource, incrementAsync, incrementRessource} from "../store/RessourceSlice";
import {addEventAction} from "../store/EventActionSlice";
import {EventActionEntity} from "./EventActionEntity";
import {useContext} from "react";
import GameContext from "../context/GameContext";

const Ressources = () => {

    const ressourceRecord = useAppSelector((state) => state.ressource);

    const dispatch = useAppDispatch();
    console.log('Ressources render: Record', ressourceRecord);

    const gameContext = useContext(GameContext);


    const onClickAdd = (ressource: string, value: number) => {
        /*dispatch(incrementRessource({
            "ressourceType": ressource,
            "value": value
        }))*/
        dispatch(incrementAsync({ressource, value}))
        dispatch(addEventAction(new EventActionEntity("Ajout " + value + " " + ressource, "incrementRessource", gameContext?.turn || 0)))

    }

    const onClickRemove = (ressource: string, value: number) => {
        dispatch(decrementRessource({
            "ressourceType": ressource,
            "value": value
        }))
        dispatch(addEventAction(new EventActionEntity("Retrait " + value + " " + ressource, "incrementRessource", gameContext?.turn || 0)))
    }
    return (<>
            <h3>Mes ressources</h3>

            <table className={"table"}>
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity in stock</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(ressourceRecord).map((ressource) => (
                        <tr key={ressource}>
                            <td>{ressource}</td>
                            <td>{ressourceRecord[ressource]}</td>
                            <td>
                                <button onClick={() => onClickAdd(ressource, 10)}
                                        className={!gameContext?.isProcessing ? "btn btn-success" : "btn btn-success disabled"}>+10
                                </button>
                                &nbsp;
                                <button onClick={() => onClickRemove(ressource, 5)}
                                        className={!gameContext?.isProcessing ? "btn btn-danger" : "btn btn-danger disabled"}>-5
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}
export default Ressources;