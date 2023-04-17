require("dotenv").config(); //genera todos los cambios necesarios en el objeto process a travez de su método config(), consumiendo el archivo . env.

const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env; //info sensible </3
const axios = require("axios"); // para realizar las peticiones http

async function getInfoApi() {
  try {
    const apiInfo = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const InfoPrincipal = apiInfo.data?.results.map((i) => {
      return {
        id: i.id,
        name: i.title,
        summary: i.summary,
        healthScore: i.healthScore,
        image: i.image,
        steps:
          i.analyzedInstructions[0] && i.analyzedInstructions[0].steps
            ? i.analyzedInstructions[0].steps.map((s) => s.step).join(" \n")
            : "", 
        diets: i.diets, 
      };
    });
    return InfoPrincipal;
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function getDataBaseRecipe() {
  
    return await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };


  async function getAllRecipes() {
  
    const saveApiInformation = await getInfoApi(); 
    const saveDbInformation = await getDataBaseRecipe();
    const allRecipes = await saveApiInformation.concat(saveDbInformation);
  
    return allRecipes;
  };
  
  async function createIdRecipe(){
    const allRecipes = await Recipe.findAll();
    const allID = allRecipes.map(r => { return r.id })
    let id = Math.floor(Math.random()*123456)
    while(allID.includes(id)){
        id = Math.floor(Math.random()*123456)
    }
    return id
  };
 
  async function getRecipeById(id) {
    return id
  }

  async function newRecipe(name, summary, healthScore, image, steps, typeDiets){
    const id = await createIdRecipe()
    //console.log("entrando al controlador de creacion de receta");
    const recipe = await Recipe.create({
        id: id,
        name: name,
        summary: summary,
        healthScore: healthScore,
        image: image,
        steps: steps,
       
    })
    
    typeDiets.map(async(diet) => {const dietName = await Diets.findOne({ where: { name: diet }})
    await recipe.addDiets(dietName); })
    
    return recipe
  };

  async function keepDietsDb(){
    const Information = (await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )).data?.results;
    const infoPrincipal = Information.map(async(recipe)=>{
      recipe.diets.map(async(diet)=>{
        await Diets.findOrCreate({
          where: { name: diet },
          defaults: { name: diet }
        })
      })
    });
    return 
  };

  async function getAllDiets(){
    const allDiets = await Diets.findAll();
    return allDiets
  };
  
  module.exports = {
      getAllRecipes,
      newRecipe,
      createIdRecipe,
      keepDietsDb,
      getAllDiets,
      
  }
      