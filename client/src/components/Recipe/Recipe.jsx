import React from "react";
import "../Recipe/Recipe.css";

export default function Recipe({ name, diets, image, id }) {
  console.log(image)

 
  return (
   
    <React.Fragment>
      <div className="recipe-card" key={id}>
        <h2 className="text-recipe">{name}</h2>
        <div className="img-container">
          <img src={image} alt="Imagen NO disponible" />
        </div>
        <div className="diet">
          {diets && diets.length > 0 && diets[0]?.name
            ? diets.map((d) => <span key={d.id}>{d.name}</span>)
            : diets && diets.map((d) => <span key={d}>{d + " "}</span>)}
        </div>
      </div>
    </React.Fragment>
   
  );
}
