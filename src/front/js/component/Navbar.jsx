import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	   const {store,actions}=useContext(Context)
	   const navigate=useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/contact">
						<button className="btn btn-primary">Contact</button>
					</Link> 
					<span onClick={()=>{actions.setActivePage("people"); navigate("/characters")}} className="btn btn-primary">Characters</span>
					<span onClick={()=>{actions.setActivePage("planets"); navigate("/planets")}} className="btn btn-primary">Planets</span>
					<span onClick={()=>{actions.setActivePage("starships"); navigate("/starships")}} className="btn btn-primary">Starships</span>
				</div>
			</div>
		</nav>
	);
};
