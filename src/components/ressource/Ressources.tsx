import {useAppDispatch, useAppSelector} from "../../store/storeHooks";
import {decrementRessource, incrementRessource} from "./ressourcesSlice";
import {addGameEvent} from "../gameEvent/gameEventSlice";
import {GameEventEntity} from "../gameEvent/GameEventEntity";
import {useContext} from "react";
import GameContext from "../../context/GameContext";
import {fireRessourceError} from "../../helpers/swalHelpers";
import {RessourceError} from "../../error/customErrors";

const Ressources = () => {

    const ressources = useAppSelector((state) => state.ressources);

    const dispatch = useAppDispatch();

    const gameContext = useContext(GameContext);


    const onClickAdd = (ressource: string, value: number) => {
        (async () => {
            dispatch(incrementRessource({ressourceType: ressource, quantity: value}))
        })().then(() => dispatch(addGameEvent(new GameEventEntity("Ajout " + value + " " + ressource, "ressources", gameContext?.turn || 0))))
            .catch((err) => {
                if (err instanceof RessourceError) {
                    dispatch(addGameEvent(new GameEventEntity("Manque de " + err.ressourceType + " pour terminer le tour", "ressources", gameContext?.turn || 0)))
                    fireRessourceError(err.message)
                } else {
                    throw err;
                }
            })
    }

    const onClickRemove = (ressource: string, value: number) => {
        (async () => {
            dispatch(decrementRessource({ressourceType: ressource, quantity: value}))
        })().then(() => dispatch(addGameEvent(new GameEventEntity("Retrait " + value + " " + ressource, "ressources", gameContext?.turn || 0))))
            .catch((err) => {
                if (err instanceof RessourceError) {
                    dispatch(addGameEvent(new GameEventEntity("Manque de " + err.ressourceType + " pour terminer le tour", "ressources", gameContext?.turn || 0)))
                    fireRessourceError(err.message)
                } else {
                    throw err;
                }
            })
    }
    return <>
        <h3>Ressources</h3>

        <table className={"table table-sm"}>
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                ressources?.map((ressource) => (
                    <tr key={ressource.type}>
                        <td>
                            <img alt={ressource.type} src={process.env.PUBLIC_URL + ressource.getImageSrc()}
                                 style={{width: "30px"}}/>&nbsp; {ressource.type}</td>
                        <td>{ressource.quantity}</td>
                        <td>
                            <button onClick={() => onClickAdd(ressource.type, 10)}
                                    className={!gameContext?.isProcessing ? "btn btn-sm btn-success" : "btn btn-sm btn-success disabled"}>+10
                            </button>
                            &nbsp;
                            <button onClick={() => onClickRemove(ressource.type, 5)}
                                    className={!gameContext?.isProcessing ? "btn btn-sm btn-danger" : "btn btn-sm btn-danger disabled"}>-5
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </>

}
export default Ressources;