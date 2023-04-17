import { useState } from "react"
import style from '../SearchBar/SearchBar.module.css'


function SearchBar(props) {
    const [ recipe, setRecipe] = useState(0)
    
    const handleSearch = (event) => {
        var { value } = event.target
        setRecipe(value)
    }
    return (
    <div className={style.search}>
        <input  className={style.input} type='search' onChange={handleSearch} />
        <button className={style.button} onClick={() => props.onSearch(recipe)}>Search</button>
    </div>
  )
}

export default SearchBar