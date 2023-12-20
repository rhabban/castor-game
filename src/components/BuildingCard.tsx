import {useAppDispatch} from "../store/Hooks";
import {BuildingEntity} from "./BuildingEntity";
import {deleteBuilding, toggleActivate} from "../store/BuildingSlice";
import {useContext} from "react";
import GameContext from "../context/GameContext";
import {addEventAction} from "../store/EventActionSlice";
import {EventActionEntity} from "./EventActionEntity";

const BuildingCard = ({building}: { building: BuildingEntity }) => {
    const gameContext = useContext(GameContext);
    const dispatch = useAppDispatch();
    console.log("BuildingCard render;")

    const onClickToggle = () => {
        dispatch(toggleActivate(building))
        dispatch(addEventAction(new EventActionEntity(building.name + " isEnable= " + building.isEnabled, "building", gameContext?.turn || 0)))
    }

    const onClickDelete = () => {
        dispatch(deleteBuilding(building));
        dispatch(addEventAction(new EventActionEntity(building.name + " deleted", "building", gameContext?.turn || 0)))
    }

    return (
        <>
            <div className="card col-3" style={{"padding": "0"}}>
                <img
                    src="https://images-ext-2.discordapp.net/external/10jAPDcW1_3z6EpCoXJCVstGo0H8DXtjPazPzoKYgME/%3Fcb%3D20221105224430/https/static.wikia.nocookie.net/against-the-storm/images/0/0f/Leatherworks_icon.png/revision/latest?format=webp"
                    className={"card-img-top"} alt="..."/>
                <div className="card-body"
                     style={!building.isEnabled ? {color: "gray", backgroundColor: "lightgray"} : {}}>
                    <h5 className="card-title">{building.name} {!building.isEnabled ? <em>ZzZz</em> : <></>}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{building.isEnabled ? <>actif</> : <>inactif</>}</h6>

                    <p className="card-text"> + {building.isEnabled ? building.quantityOut : 0} {building.ressourceTypeOut} /
                        - {building.isEnabled ? building.quantityIn : 0} {building.ressourceTypeIn}</p>

                    <button className={!gameContext?.isProcessing ? "btn btn-primary" : "btn btn-primary disabled"}
                            onClick={onClickToggle}>Activer
                    </button>
                    &nbsp;
                    <button className={!gameContext?.isProcessing ? "btn btn-danger" : "btn btn-danger disabled"}
                            onClick={onClickDelete}>Supprimer
                    </button>
                </div>
            </div>

        </>
    )
}
export default BuildingCard;

