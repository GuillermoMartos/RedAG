import React from 'react';
import Card from "../Card/Card";


export default function PanMasas(data) {

    return (
        <div>
            <h1>PANES Y MASAS</h1>
            <div className="container-card">
                {data.data.length > 0 ?
                    data.data?.map((item) => {
                        return item.categoria.map(cat => {
                            if (cat.nombre === "Pan y Masas") {
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