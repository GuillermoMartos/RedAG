import React from 'react';
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import mapProduct from '../../Utils/mapper';



export default function Quesos(data) {
    const productos = useSelector((state) => mapProduct(state.productos, "Quesos"))
    console.log('spy el quesitos', productos)


    return (
        <div>
            <h1>QUESOS</h1>

            <div className="container-card">
                {data.data.length > 0 ?
                    data.data?.map((item) => {
                        return item.categoria.map(categoria => {
                            if (categoria.nombre == "Quesos") {
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