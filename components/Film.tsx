import { FunctionComponent } from "preact";
import { Film } from "../types.ts";


const Films: FunctionComponent<{props: Film}> = ({props}) => {

    return(
        <div>
            <h3>{props.name}</h3>
            <img src={props.staticImageUrl}/>
            <p>Marca: {props.brand}</p>
            <p>ISO: {props.iso}</p>
        </div>
    )
}

export default Films;