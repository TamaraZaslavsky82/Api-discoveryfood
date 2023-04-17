const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllRecipes} = require ('../controllers/FuctionRecipes');
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
      return res.status(400).json({ error: error.message});
    }
  });

  
  


module.exports = router;
