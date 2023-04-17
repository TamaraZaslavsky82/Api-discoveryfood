import React from 'react'
import style from '../../../src/components/Recipe/Recipe.module.css'

function Recipe(props) {
  return (
    <div className={style.fondo}>
        <div className={style.container}>
            <button className={style.close} onClick={props.onClose} >🍜</button>
            <h4 className={style.title}>{props.title}</h4>
            <img src={props.image} alt='' className={style.img} />
            <h2>{props.typeDiet}</h2>
        </div>
    </div>
  )
}

export default Recipe