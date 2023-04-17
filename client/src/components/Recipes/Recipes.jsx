import React from 'react'
import Recipe from '../../components/Recipe/Recipe'
import style from '../../../src/components/Recipes/Recipes.module.css'


function Recipes(props) {
  const { recipes } = props
  let i = 0
  return (
    <div  >
      <div className={style.container} >
        {recipes && recipes.length > 0 ? (
          recipes.map((e) => (
            <Recipe
              id={e.id}
              title={e.title}
              summary={e.summary}
              healthScore={e.healthScore}
              diet={e.diet}
              image={e.image}
              onClose={() => props.onClose(e.id)}
              key={i++}
            />
          ))
        ) : (
          <p> Descubre tu receta del dia !!</p>
        )}
      </div>
    </div>
  )
}

export default Recipes
