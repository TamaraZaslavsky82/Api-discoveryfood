import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeID, limpiarID } from "../../Redux/actions";
import { Link, useParams } from "react-router-dom";
import '../RecipesDetails/RecipeDetail.css'

export default function RecipesDetail() {
  const dispatch = useDispatch();
  const recetas = useSelector((state) => state.recetasDetail); //trae del estado inicial todas las recetas
  const { id } = useParams();

  useEffect(() => {
    dispatch(limpiarID());
    dispatch(getRecipeID(id))
      .catch((error) => {
        console.log("Ha ocurrido un error al obtener la receta:", error);
        // Actualizar el estado con el mensaje de error para el usuario
      });
  }, [dispatch, id]);

  return (
    <div className="container__nav">
      {recetas && recetas.length > 0 ? (
        <div>
          <h2 className="a__detail">{recetas[0].name}</h2>

          <img
            src={recetas[0].image ? recetas[0].image : recetas[0].imagen}
            alt="Imagen NO disponible"
            width="300px"
            height="300px"
            className="img"
          />

          <p>
            <h5 className="summary">
              Resumen del plato:{" "}
              {recetas[0].summary ? recetas[0].summary.replace(/<[^>]*>?/g, "") : "No hay resumen disponible."}
            </h5>
          </p>

          <h5 className="score">
            Nivel de comida saludable:{" "}
            {recetas[0].healthScore ? recetas[0].healthScore : "No se ha indicado el nivel de salud de esta receta."}
          </h5>

          <p className="paso">
            Pasos a seguir:{" "}
            {recetas[0].steps ? recetas[0].steps : "No se han indicado pasos a seguir para esta receta."}
          </p>

          <h4>
  Dietas:{" "}
  {recetas[0].diets && recetas[0].diets.length > 0
    ? recetas[0].creadoDB
      ? recetas[0].diets.map((d) => (d.name + ", "))
      : JSON.stringify(recetas[0].diets).replace(/[\[\]{}]/g, "") + " "
    : "No se han indicado dietas asociadas."
  }
</h4>


          <Link to="/home">
            <button className="button__detail">Go back</button>
          </Link>
        </div>
      ) : (
        <div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>
      )}
    </div>
  );
}
