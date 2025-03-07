import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo-sin-fondo.jpg"
export const Profile = () => {
  const [selected, setSelected] = useState("");

    return(
        <div className="container mt-5 " style={{ justifyContent: "center", alignItems: 'center', textAlign:"center", width: "40rem" }}>
          
          <h4> Welcome back </h4>
          <p> here goes the avatar </p>
          <img src={ logo } alt="Logo sin fondo"/>
          
          <h1>How are you feeling today?</h1>

          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="muybien" autocomplete="off" onChange={() => setSelected("muybien")}/>
          <label className={`btn ${selected === "muybien" ? "btn-primary":"btn-outline-primary"}`} htmlFor="muybien">Muy bien</label>

          <input type="radio" className="btn-check" name="btnradio" id="bien" autocomplete="off" onChange={() => setSelected("bien")}/>
          <label className={`btn ${selected === "bien" ? "btn-primary":"btn-outline-primary"}`} htmlFor="bien">Bien</label>
          

          <input type="radio" className="btn-check" name="btnradio" id="regular" autocomplete="off" onChange={() => setSelected("regular")}/>
          <label className={`btn ${selected==="regular" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="regular">Regular</label>

          <input type="radio" className="btn-check" name="btnradio" id="mal" autocomplete="off" onChange={() => setSelected("mal")}/>
          <label className={`btn ${selected==="mal" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="mal">Mal</label>

          <input type="radio" className="btn-check" name="btnradio" id="enfadado" autocomplete="off" onChange={() => setSelected("enfadado")}/>
          <label className={`btn ${selected==="enfadado" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="enfadado">Enfadado</label>

          <input type="radio" className="btn-check" name="btnradio" id="triste" autocomplete="off" onChange={() => setSelected("triste")}/>
          <label className={`btn ${selected==="triste" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="triste">Triste</label>
          </div>
       
           <div className= "container mt-3" >
              <button> Check my progress </button>
           </div>  
        </div>  
      )

}