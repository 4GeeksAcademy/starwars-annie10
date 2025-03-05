import React, { Component, useState } from "react";
import { Producto } from "../component/producto";


export const VistaProducto = () => {
  
    return (

  
<div className="flex-container mt-5 text-center">
        <Producto/>
    <hr className="mt-5" style={{width: "90%"}}></hr>
    <div className="sección similares my-5">
				<h3>Productos similares</h3>
				<div className="row justify-content-center my-5">
					{/* AQUI IRIAN LAS CARDS
                    <Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" /> */}
    
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
				</div>
			</div>

</div>



    );
}