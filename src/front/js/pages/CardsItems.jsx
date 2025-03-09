import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const CardsItems = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const handleDetails = (itemUid,itemUrl) => {
        actions.getItemsDetails(itemUrl,itemUid);
        navigate("/item-details");
    };
    const handleFavorite = (itemName) => {
        actions.setFavorite(itemName) 
    };

    return (
        <div className="container mt-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-5">
                {store[store.activePage].map((item) => (
                    <div key={item.uid} className="col">
                        <div className="card h-100 shadow-sm bg-dark">
                            <img className="card-img-top img-fluid" alt={item.name}
                                onError={(e) => { e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/big-placeholder.jpg" }}
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${store.activePage === 'people' ? 'characters' : store.activePage}/${item.uid}.jpg`} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="mt-auto d-flex justify-content-between">
                                    <span className="btn btn-secondary" onClick={() => handleDetails(item.uid, item.url)}>Details</span>
                                    <button className={`btn btn-${store.favorites.includes(item.name) ? "warning" : "outline-warning"}`} onClick={() => handleFavorite(item.name)}><i className="fa-regular fa-heart"></i></button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>



    )


}