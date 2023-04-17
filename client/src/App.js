import DiscoveryIntro from "../src/components/Intro/DiscoveryIntro";
import { Switch, Route, useLocation } from 'react-router-dom';
import Loader from "./components/cargador/Loader";
import Home from "./components/Home/Home";
import Nav from './components/Nav/Nav';
import { useEffect, useState } from "react";
import Recipes from "./components/Recipes/Recipes";

const API_KEY = "6131cfdeade44e51a0a68e89e1240f09";

function App() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);

  async function onSearch(recipeName = '') {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipeName}`
      );
      const data = await response.json();
      setRecipes(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    onSearch('');
  }, []);

  function onClose(id) {
    setRecipes(recipes.filter((element) => element.id !== id));
  }

  return (
    <div>
      {location.pathname !== '/' && location.pathname !== '/loader' && <Nav onSearch={onSearch}/>}
      <Switch>
        <Route exact path="/" component={DiscoveryIntro } />
        <Route path="/loader" component={Loader } />
        <Route path="/home" >
          <Recipes recipes={recipes} onClose={onClose}/> 
        </Route>
      </Switch>
    </div>
  );
}

export default App;
