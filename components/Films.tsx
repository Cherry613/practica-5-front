import { FunctionComponent } from "preact";
import { Film } from "../types.ts";
import AddFilm from "../islands/AddFilm.tsx";


const Films: FunctionComponent<{props: Film[]}> = ({props}) => {

    return(
        <div class="films">
            {props.map((elem) => {
                return(
                    <div class="film">
                        <h3>{elem.name}</h3>
                        <img src={elem.staticImageUrl}/>
                        <p>Marca: {elem.brand}</p>
                        <p>Descripción: {elem.description}</p>
                        <AddFilm film={elem}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Films;