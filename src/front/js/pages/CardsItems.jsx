import React, { useContext } from "react";
import { Context } from "../store/appContext";




export const CardsItems = () => {
const {store,actions}=useContext(Context)

    const handleDetails = () => { console.log("hola") }

    return (


        <div>
            <ul>
               { store[store.activePage].map((item)=>
                <li key={item.uid}>
                    <div className="card">
                    <img className="card-img-top img-fluid rounded img-custom " alt={item.name}
                            onError={(e) => { e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/big-placeholder.jpg" }}
                            src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${store.activePage === 'people' ? 'characters' : store.activePage}/${item.uid}.jpg`} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <span onClick={handleDetails} className="btn btn-primary">Details</span>
                            </div>
                    </div>
               
                </li>
                )}
            </ul>
        </div>



    )


}