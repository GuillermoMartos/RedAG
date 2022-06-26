import { GET_PRODUCTOS, FILTRAR_PRECIO } from "./indexActions";

const initialState = {
  categorias: [],
  productos: [],
  totalProductos: [],
  detalleProducto: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTOS: {
      const copia = action.payload.productos
      return {
        ...state,
        productos: action.payload.productos,
        totalProductos: copia,
        categorias: action.payload.categorias
      }
    }
    case FILTRAR_PRECIO: {
      let filterState = state.productos
      filterState = action.payload === "asc" ?
        filterState.sort((a, b) => {
          if (parseFloat(a.precio) > parseFloat(b.precio)) return 1;
          if (parseFloat(b.precio) > parseFloat(a.precio)) return -1;
          return 0;
        })
        :
        filterState.sort((a, b) => {
          if (parseFloat(a.precio) > parseFloat(b.precio)) return -1;
          if (parseFloat(b.precio) > parseFloat(a.precio)) return 1;
          return 0;
        })

      console.log(state.productos)
      return {
        ...state,
        productos: filterState,
      }

    }

    default:
      return state;
  }
};

export default rootReducer;
