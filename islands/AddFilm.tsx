//modal

import { FunctionComponent } from "preact";
import { Film, Project } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

type AddFilmProps = {
    film: Film;
}

const AddFilm: FunctionComponent<AddFilmProps> = ({film}) => {

    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [createProjectModal, setCreateProjectModal] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [proj, setProj] = useState<string>("");    //proyecto seleccionado
    const [projectName, setProjectName] = useState<string>("");

    useEffect(() => {
        const cookieProjects: Project[] = [];
        document.cookie.split("; ").forEach((cookie) => {
          if (cookie.startsWith("project_")) {
            cookieProjects.push(JSON.parse(cookie.split("=")[1]));
          }
        });
        setProjects(cookieProjects);
      }, []);

    const createProject = () => {   //crear un proyecto
        const proyecto: Project = {
            _id: Date.now().toString(),
            name: projectName,
            films: [],
        };
        document.cookie = `project_${proyecto._id}=${
        JSON.stringify(proyecto)
        }; path=/;`;

        setProjects([...projects, proyecto]);
        setProj(proyecto._id);
        setProjectName("");
        setCreateProjectModal(false);
    }

    return(
        <>
            <button class="button-add" onClick={() => setDisplayModal(true)}>+</button>

            {displayModal && (
                <div class="modal">
                    <div class="modal-content">
                        <span class="close"
                            onClick={() => {
                                setDisplayModal(false);
                                window.location.reload();
                            }}> &times; </span>
                    
                        <h4 class="modal-h4">Add this film to your proyect?</h4>
                        {projects.length < 0 ? <p>No proyects</p> : (
                                <div>
                                    <select onChange={(e) => (setProj(e.currentTarget.value))}> 
                                        {projects.map((elem) => (
                                            <option value={elem._id}> {elem.name} </option>
                                        ))}
                                    </select>
                                    <button class="modal-button"> Add film </button>
                                </div>
                        )}
                        <button class="modal-button" onClick={() => setCreateProjectModal(true)}>
                            Create New Project
                        </button>
                    </div> 
                    { createProjectModal && (
                        <div class="modal">
                            <div class="modal-content">
                                <span class="close"
                                    onClick={() => {
                                        setProjectName("");
                                        setCreateProjectModal(false);
                                    }}
                                > &times; </span>
                                <h4>Create project</h4>
                                <input class="modal-input" type="text" placeholder={"project's name"} onBlur={(n) => setProjectName(n.currentTarget.value)}></input>
                                <button class="modal-button" onClick={createProject}>Create Project</button>
                            </div>
                        </div>
                    )}
                </div> 
            )}
        </>
    )
}

export default AddFilm;