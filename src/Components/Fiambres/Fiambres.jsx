import React from 'react';
import Card from "../Card/Card";


export default function Fiambres(data) {

    return (
        <div>
            <h1>FIAMBRES</h1>
            <div className="container-card">
                {data.data.length > 0 ?
                    data.data?.map((item) => {
                        return item.categoria.map(cat => {
                            if (cat.nombre === "Fiambres") {
                                return < Card
                                    imagen={item.imagen}
                                    nombre={item.nombre}
                                    marca={item.marca}
                                    precio={item.precio}
                                    disponible={item.disponible}
                                    detalle={item.detalle}
                                    cantidad={item.cantidad}
                                ></Card>
                            }
                        })
                    }) :
                    null
                }
            </div>

        </div >
    )
};