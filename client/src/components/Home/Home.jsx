import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  filtrarDietas,
  creadosDB,
  orderByAlfabeto,
  orderByPuntaje,
} from "../../Redux/actions";
import { Link } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import Paginado from "../Paginado/Paginado";
import "../Home/Home.css";
import Footer from "../footer/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecetas); //trae del estado inicial todas las recetas
  const [orden, setOrden] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [recetasPorPagina, setRecetasPorPagina] = useState(9);
  const indiceUltimaReceta = paginaActual * recetasPorPagina;
  const indicePrimerReceta = indiceUltimaReceta - recetasPorPagina;
  const recetasActuales = allRecipes.slice(
    indicePrimerReceta,
    indiceUltimaReceta
  );
  console.log(recetasActuales);
  const paginado = (pagNumber) => {
    setPaginaActual(pagNumber);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  
  function handleClick(e) {
 
    e.preventDefault(); 
    dispatch(getAllRecipes());
  }

  function handleFiltroDietas(e) {
    dispatch(filtrarDietas(e.target.value));
  }

  function handleCreadosDB(e) {
    dispatch(creadosDB(e.target.value));
  }

  function handleOrdenarAlfabeto(e) {
    e.preventDefault();
    dispatch(orderByAlfabeto(e.target.value));
    setPaginaActual(1);
    setOrden(`Ordenado de ${e.target.value}`);
  }

  function handleOrdenarPuntaje(e) {
    e.preventDefault();
    dispatch(orderByPuntaje(e.target.value));
    setPaginaActual(1);
    setOrden(`Ordenado de ${e.target.value}`);
  }

  return (
    <div>
      <div>
        {/* lista desplegable de opciones de ordenamiento alfabetico */}
        <select className="sort" onChange={(e) => handleOrdenarAlfabeto(e)}>
          <option value="Alfabeticamente">Sort by alphabet</option>
          <option value="AZ">Ordenadas de A-Z</option>
          <option value="ZA">Ordenadas de Z-A</option>
        </select>

        {/* lista desplegable de opciones de ordenamiento por Nivel de comida Saludable */}
        <select className="level" onChange={(e) => handleOrdenarPuntaje(e)}>
          <option value="nivelSalud">Sort by healthy food level</option>
          <option value="ascendente">Sort from the highest score</option>
          <option value="descendente">Sorder from lowest score</option>
        </select>

        {/* lista desplegable de opciones de los tipos de Dietas */}
        <select className="sort" onChange={(e) => handleFiltroDietas(e)}>
          <option velue="ALL">All Diets</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole30</option>
          <option value="fodmap friendly">Fodmap Friendly</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="ketogenic">Ketogenic</option>

          {/* <option value="ovo-vegetarian">Ovo-Vegetarian</option> */}
        </select>

        {/* lista desplegable de opciones sobre las Recetas */}
        <select className="level" onChange={(e) => handleCreadosDB(e)}>
          <option value="all">All Recipes</option>
          <option value="created">Recipes Created</option>
          <option value="api">Current Recipes</option>
        </select>

        <Paginado
          recetasPorPagina={recetasPorPagina}
          allRecetas={allRecipes.length}
          paginado={paginado}
        />

        <React.Fragment>
          <div className="fondo">
            {recetasActuales?.map((r) => {
              return (
                <div key={r.id}>
                  <Link
                    to={"/recipes/" + r.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Recipe
                      name={r.name}
                      diets={r.diets}
                      image={r.image}
                      id={r.id}
                      key={r.id}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </React.Fragment>

        <Paginado
          recetasPorPagina={recetasPorPagina}
          allRecetas={allRecipes.length}
          paginado={paginado}
        />
       
      </div>
    </div>
  );
}
