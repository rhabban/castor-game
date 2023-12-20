import Swal from "sweetalert2";

export const wait = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
};

export const fireEndTourEvent = (turn: number) => {
    Swal.fire({
        icon: 'success',
        text: 'You have successfully played turn ' + turn + ' !',
        toast: true,
        position: 'center'
    })
}

/*export const attack = ({attacker, receiver}) => {
    const receivedDamage =
        attacker.attack - (attacker.level - receiver.level) * 1.25;

    const finalDamage = receivedDamage - receiver.defense / 2;

    return finalDamage;
};
export const magic = ({attacker, receiver}) => {
    const receivedDamage =
        attacker.magic - (attacker.level - receiver.level) * 1.25;

    const finalDamage = receivedDamage - receiver.magicDefense / 2;

    return finalDamage;
};
export const heal = ({receiver}) => {
    return receiver.magic + receiver.level * 0.25;
};*/
