const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllRecipes, newRecipe, getAllDiets } = require("../controllers/FuctionRecipes");
const router = Router();

router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    const getRecipes = await getAllRecipes();

    if (name) {
      const filterRe = getRecipes.filter((recipes) =>
        recipes.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filterRe.length > 0) {
        return res.status(200).json(filterRe);
      } else {
        return res.status(400).json("SIN Coincidencia");
      }
    } else {
      return res.status(200).json(getRecipes);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allRecipes = await getAllRecipes();
    if (id) {
      const recipeId = allRecipes.filter(
        (i) => i.id.toString() === id.toString() 
      );
      // const recipeId = await getRecipeById(id)
      if (recipeId.length > 0) {
        return res.json(recipeId);
      } else {
        return res.status(404).send("No se encontro la receta buscada");
      }
    }
  } catch (error) {
    return res.status(400).send("Error ", error);
  }
});

router.post("/recipes", async (req, res) => {
  try {
    const { name, summary, healthScore, image, steps, diets } = req.body;

    const newRecetas = await newRecipe(
      name,
      summary,
      healthScore,
      image,
      steps,
      diets
    );

    if (newRecipe) {
      return res.status(201).json(newRecetas);
    }
  } catch (error) {
   
    return res.status(400).send("Error ", error);
  }
});
router.get("/diets", async (req, res) => {
  try {
    const allDiets = await getAllDiets();
    return res.status(200).json(allDiets);
  } catch (error) {
    return res.status(400).send("Error ", error);
  }
});

module.exports = router;
