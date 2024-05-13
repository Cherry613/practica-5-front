import { useEffect, useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { Film } from "../types.ts";
import Films from "../components/Films.tsx";

//filtros de marca, sensibilidad ISO, formato, color/blanco&negro -> seleccionar
//nombre -> escribiendo
//dijo q tiene mas sentido el checkbox

//el map me repite 400000 veces lo mismo + hacer que se filtre sin tener que darle al boton 
const Filtro: FunctionComponent<{props: Film[]}> = ({props}) => {
    const [name, setName] = useState<string>("")
    const [marca, setMarca] = useState<string>("")
    const [iso, setIso] = useState<number>(0);
    const [color, setColor] = useState<string>("")
    const [format, setformat] = useState<string>("");
    const [lista, setLista] = useState<Film[]>(props) 

    let films: Film[] = props;

    useEffect(() => {
       Filter();
    }, )

    const Filter = () => {

        if(name !== ""){
            films = films.filter((elem) => elem.name.includes(name))
        }
        if(marca !== ""){
            films = films.filter((elem) => elem.brand.includes(marca))
        }
        if(iso){
            films = films.filter((elem) => elem.iso === iso)
        }
        if(format){
            if(format === "0") {
                films = films.filter((elem) => elem.formatThirtyFive === true)
            }
            if(format === "1") {
                films = films.filter((elem) => elem.formatOneTwenty === true)
            }
            if(format === "2") {
                films = films.filter((elem) => elem.formatOneTwenty === true && elem.formatThirtyFive === true)
            }
        }
        if(color){
            if(color === "0") {
                films = films.filter((elem) => elem.color === false)
            }
            if(color === "1") {
                films = films.filter((elem) => elem.color === true)
            }
        }

        setLista(films);
        }
    

    //<button onClick={Filter}>Filtrar</button>
    return(
        <div class="container">
            <input class="filter" type ="text" id="name" name = "name" placeholder={"Nombre"} onBlur={(n) => setName(n.currentTarget.value)}></input>
            
            <select  class="filter" id="marca" name="marca" onChange={(e) => (setMarca(e.currentTarget.value))}>
                <option value ="">All brands</option>
                {[...new Set(props.map(marca => marca.brand))].map((brand) => (
                    <option value={brand}>{brand}</option>
                ))}
            </select>

            <select class="filter" id="ISO" name="ISO" onChange={(e) => (setIso(parseInt(e.currentTarget.value)))}>
                <option value ="">All ISO</option>
                {[...new Set(props.map(film => film.iso))].map((iso) => (
                    <option value={iso}>{iso}</option>
                ))}
            </select>

            <select class="filter" id="format" name="format" onChange={(e) => (setformat((e.currentTarget.value)))}>
                <option value ="">All</option>
                <option value="0">formatThirtyFive</option>
                <option value="1">formatOneTwenty</option>
                <option value="2">Both</option>
            </select>

            <select class="filter" id="color" name="color" onChange={(e) => (setColor((e.currentTarget.value)))}>
                <option value="0">black&white</option>
                <option value="1">Color</option>
            </select>            

            <Films props ={lista} />
        </div>
    )
}

export default Filtro;
