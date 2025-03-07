import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";



export const Notes = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Notes</h1>







        </div>
    );
};










// return (
//     <div className="container mt-5 w-50">
//         <div className="d-flex justify-content-center fs-2 mb-2"><input className="w-75 border-2 rounded-pill text-center" type="text" placeholder="What do you need to do?" onKeyDown={agregarLista} value={tarea} onChange={agregarTarea} /></div>
//         <ul className="my-2 p-0 d-flex justify-content-between">
//             {/* Crear con map lista */}
//             <div className="list-group">
//                 {listaTareas.length > 0 ? listaTareas.map((item) => <li className="list-group-item list-group-item-dark" key={item.id}>{item.label}<button type="button" className="btn btn-light position end-0" onClick={() => eliminarTarea(item.id)}>x</button></li>) : null}
//             </div>
//         </ul>
//         {listaTareas.length + ` Task left`}
//     </div>
// );