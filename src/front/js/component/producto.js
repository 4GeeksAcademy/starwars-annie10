import React, { Component, useState } from "react";


export const Producto = () => {
    const [precio, setPrecio] = useState(29.99); // Precio inicial

    const handleFormatoChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const nuevoPrecio = selectedOption.dataset.precio;

        // Actualizar el precio si se seleccionó un formato
        if (nuevoPrecio) {
            setPrecio(nuevoPrecio);
        } else {
            setPrecio(29.99); // Precio por defecto
        }
    };
    return (

  
<div className="container mt-5 text-center">
    <div className="row">
        <div className="col-md-8" style={{ width: "90%", height: "400px" }}>
            <div className="card mb-3 d-flex flex-column" style={{ height: "100%" }}>
                <div className="row g-0 flex-fill">
                    <div className="col-md-4">
                        <img src="https://era2vrmzk5n.exactdn.com/wp-content/uploads/2022/06/Pienso-Ayurveda-gato-kasaludintegral-1080x1080pix.jpg" className="img-fluid rounded-start m-1" alt="Producto" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column flex-grow-1">
                            <h5 className="card-title"><strong>Nombre del Producto</strong></h5>
                            <hr />
                            <div className="m-3 d-flex justify-content-around align-items-center">
                                <h2 className="card-text text-xl-start">{precio}€</h2>
                                <div>
                                    <label htmlFor="formatoProducto" className="form-label visually-hidden">Formato del Producto:</label>
                                    <select className="form-select form-select-sm" id="formatoProducto" onChange={handleFormatoChange}>
                                        <option value="">Seleccione un formato</option>
                                        <option value="1" data-precio="29.99">Formato 2Kg - 29.99€</option>
                                        <option value="2" data-precio="39.99">Formato 6Kg - 39.99€</option>
                                        <option value="3" data-precio="49.99">Formato 10Kg - 49.99€</option>
                                    </select>
                                </div>
                            </div>
                            <p className="card-text m-3 p-3">Descripción breve del producto que está en venta. Aquí puedes incluir características y beneficios.
                                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta).
                            </p>
                            <div className="mt-auto text-center">
                                <button className="btn btn-primary">Añadir carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



    );
}