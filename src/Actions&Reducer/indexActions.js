import axios from "axios"

export const GET_PRODUCTOS = "GET_PRODUCTOS"
export const FILTRAR_PRECIO = "FILTRAR_PRECIO"

export const getProductos = function () {
    return function (dispatch) {
        axios.get("http://localhost:3001/landing").then((productos) => {
            dispatch({ type: GET_PRODUCTOS, payload: productos.data });
        });
    };
};

export const actionPrecio = function (orden) {
    return function (dispatch) {
        dispatch({ type: FILTRAR_PRECIO, payload: orden });
    };
};