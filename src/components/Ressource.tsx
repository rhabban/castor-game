import {useState} from "react";

export enum RessourceTypeEnum {
    BOIS = "bois",
    PLANCHE = "planche",
    PIERRE = "pierre"
}

export class RessourceEntity {
    type: RessourceTypeEnum;

    count: number;

    constructor(type: RessourceTypeEnum, count: number) {
        this.type = type;
        this.count = count;
    }
}

const Ressource = ({name, iCount}: { name: string, iCount: number }) => {

    const [count, setCount] = useState(iCount)

    /*useEffect(() => {
        addLoadingTimeOut();
    }, []);

    const addLoadingTimeOut = () => {
        setCount(count + 1);

        setTimeout(() => {
            addLoadingTimeOut();
        }, 500);
    };*/

    return (
        <>
            <li>
                <p>{name} : {count}</p>
            </li>

        </>
    )
}
export default Ressource;