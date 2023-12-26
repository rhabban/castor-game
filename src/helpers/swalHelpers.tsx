import Swal from "sweetalert2";
import {IMission} from "../components/mission/Missions";

export const fireEndTourEvent = (turn: number) => {
    Swal.fire({
        icon: 'success',
        text: 'You have successfully played turn ' + turn + ' !',
        toast: true,
        position: 'center'
    })
}

export const fireValidNotification = (message: string) => {
    Swal.fire({
        icon: 'success',
        text: message,
        toast: true,
        position: 'center'
    })
}


export const fireMissionSuccessful = (mission: IMission) => {
    fireValidNotification("Mission terminée : " + mission.name);
}

export const fireRessourceError = (message: string) => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message
    });
}

export const fireWorkerError = (message: string) => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message
    });
}

export const fireVictory = (callback: () => void) => {
    Swal.fire({
        title: "Victoire !",
        width: 600,
        padding: "3em",
        color: "#716add",
        confirmButtonText: "Quitter la partie",
        background: "#fff url(/images/trees.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

export const fireNewlevel = (message: string) => {
    Swal.fire({
        title: "New level",
        icon: "info",
        width: 600,
        padding: "3em",
        confirmButtonText: "Go !",
        text: message
    })
}

export const fireTurnIsProcessing = () => {
    Swal.fire({
        title: "Fin du tour",
        html: "Calcul en cours",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
}