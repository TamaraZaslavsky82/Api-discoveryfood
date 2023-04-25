import React from "react";
import '../Paginado/Paginado.css'


export default function Paginado({recetasPorPagina, allRecetas, paginado}){
    const numeroDePaginas = [];
    for(let i=1; i<=Math.ceil(allRecetas/recetasPorPagina); i++){
        numeroDePaginas.push(i)
    }
    return(<div >
        <div >
            {numeroDePaginas?.map(numero =>(<button key={numero} className="button__paginado" onClick={()=>paginado(numero)}>{numero}</button>))}      
        </div>
    </div>)
}

