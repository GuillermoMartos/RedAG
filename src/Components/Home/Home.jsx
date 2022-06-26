import './Home.css'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductos } from "../../Actions&Reducer/indexActions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import { actionPrecio } from '../../Actions&Reducer/indexActions'
import Quesos from '../Quesos/Quesos';
import Lacteos from '../Lacteos/Lacteos';
import Dulces from '../Dulces/Dulces';
import Fiambres from '../Fiambres/Fiambres';
import Salsas from '../Salsas/Salsas';
import Sales from '../Sales/Sales';
import Huevos from '../Huevos/Huevos';
import Aceites from '../Aceites/Aceites';
import Picantes from '../Picantes/Picantes';
import Hongos from '../Hongos/Hongos';
import Comidas from '../Comidas veganas/Comidas veganas';
import PanMasas from '../Pan y Masas/Pan y Masas';
import Legumbres from '../Legumbres/Legumbres';
import LimpiezaCuidados from '../Baño y Limpieza/Baño y Limpieza';
import Plantas from '../Plantas/Plantas';
import Verduras from '../Verduras/Verduras';
import Otros from '../Otros/Otros';



function Home() {
  const dispatch = useDispatch()
  const [filtro, setfiltro] = useState(false);
  const productos = useSelector((state) => state.productos);
  const categorias = useSelector((state) => state.categorias);
  const [currentPage, setcurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastProductToShow = currentPage * recipesPerPage;
  const indexOfFirstToShow = indexOfLastProductToShow - recipesPerPage;
  const currentRecipesToShow = productos?.slice(
    indexOfFirstToShow,
    indexOfLastProductToShow
  );

  const paginado = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProductos())
    console.log(currentRecipesToShow)
  }, []);

  useEffect(() => { }, [filtro]);


  function filtroPrecio(e) {
    dispatch(actionPrecio(e.target.value))
    setfiltro(!filtro)
  }

  function filtroMarca(e) {
    alert(e.target.value)

  }

  function filtroCategoria() {
    alert("hola")
  }





  return (
    <div className="App">
      <Quesos data={productos}></Quesos>
      <Aceites data={productos}></Aceites>
      <Plantas data={productos}></Plantas>
      <Otros data={productos}></Otros>
      <Verduras data={productos}></Verduras>
      <Legumbres data={productos}></Legumbres>
      <LimpiezaCuidados data={productos}></LimpiezaCuidados>
      <PanMasas data={productos}></PanMasas>
      <Comidas data={productos}></Comidas>
      <Hongos data={productos}></Hongos>
      <Picantes data={productos}></Picantes>
      <Huevos data={productos}></Huevos>
      <Sales data={productos}></Sales>
      <Salsas data={productos}></Salsas>
      <Lacteos data={productos}></Lacteos>
      <Dulces data={productos}></Dulces>
      <Fiambres data={productos}></Fiambres>

      <h1>TODOS LOS PRODUCTOS</h1>

      <div className="filtroscontainer">
        <div className="filtrosHome">
          <select className="button" onChange={(e) => filtroMarca(e)}>
            <option disabled selected>
              Filtro por Marcas
            </option>
            <option value="asc">Marcas ascendente A-Z</option>
            <option value="desc">Marcas descendente Z-A</option>
          </select>
        </div>
        <div className="filtrosHome">
          <select className="button" onChange={(e) => filtroPrecio(e)}>
            <option disabled selected>
              Filtro por Precio
            </option>
            <option value="asc">Menor precio</option>
            <option value="desc">Mayor precio</option>
          </select>
        </div>
        <div className="filtrosHome">
          <select className="button" onChange={(e) => filtroCategoria(e)}>
            <option disabled selected>
              Filtro por Categoría
            </option>
            {categorias.map((d) => {
              return <option value={d?.nombre}>{d?.nombre}</option>;
            })}
          </select>
        </div>
        <div className="quitfiltros">
          <button className="button-quit" onClick={() => { }}>
            QUIT FILTERS
          </button>
        </div>
      </div>
      <div className="container-card">
        {currentRecipesToShow?.map((item) => {
          return (


            <Card
              imagen={item.imagen}
              nombre={item.nombre}
              marca={item.marca}
              precio={item.precio}
              disponible={item.disponible}
              detalle={item.detalle}
              cantidad={item.cantidad}
            ></Card>
          );
        })}
      </div>

      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={productos?.length}
        paginado={paginado}
      ></Paginado>
    </div >
  )
}

export default Home
