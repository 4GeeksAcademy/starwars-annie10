import React from "react";
import "../../styles/home.css";
import starImageUrl from "../../img/star-wars.jpg";

export const Home = () => {
    return (
        <div className="text-center mt-5">
           <img src={starImageUrl}  className="img-fluid" />
          
        </div>
    );
};
