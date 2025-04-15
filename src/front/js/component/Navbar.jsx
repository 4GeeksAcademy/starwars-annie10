import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/logo.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 mt-3">
			<div className="container">
				<Link to="/" >
					<span className="navbar-brand mb-0 h1">
						<img alt="" src={logoImageUrl} style={{ height: "50px" }} />
					</span>
				</Link>
				<div className="ml-auto d-flex gap-3">

					<button
						onClick={() => { actions.setActivePage("people"); navigate("/characters"); }}
						className="btn btn-outline-secondary"
					>
						Characters
					</button>
					<button
						onClick={() => { actions.setActivePage("planets"); navigate("/planets"); }}
						className="btn btn-outline-secondary"
					>
						Planets
					</button>
					<button
						onClick={() => { actions.setActivePage("starships"); navigate("/starships"); }}
						className="btn btn-outline-secondary"
					>
						Starships
					</button>
					<Link to="/contact">
						<button className="btn btn-outline-secondary">Contact</button>
					</Link>
					<div className="btn-group">
						<button type="button" className="btn btn-outline-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">favorites
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{store.favorites.length}</span>
						</button>
						<ul className="dropdown-menu">
							{store.favorites.map((favoriteItem) =>
								<li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<span className="dropdown-item">{favoriteItem}</span>
									<span onClick={() => actions.setFavorite(favoriteItem)}><i className="fa-solid fa-heart-crack"></i></span>
								</li>)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
