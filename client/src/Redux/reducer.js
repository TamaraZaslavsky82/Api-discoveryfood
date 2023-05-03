const initialState = {
    recetasFiltradas: [],
    allRecetas: [],
    dietas: [],
    recetasDetail: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_ALL_RECETAS": return {
            ...state,
            recetasFiltradas: action.payload,
            allRecetas: action.payload,
        };


        case "GET_RECETAS_NAME": return {
            ...state,
            allRecetas: action.payload,
        };


        case "GET_RECETA_ID": return {
            ...state,
            recetasDetail: action.payload
        };
        
        case "LIMPIAR": return {
            ...state,
            recetasDetail: []
        }

        case "POST_RECETA": return {
            ...state
        };


        case "GET_DIETAS": return {
            ...state,
            dietas: action.payload
        };

        case "FILTER_BY_DIETS_TYPE": 
            const allRecetas = state.recetasFiltradas
            let dietsAPI = []
            let dietsDB = []
           
            allRecetas.forEach(e => {
                if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
                        dietsAPI.push(e)
                    }  
                });
            allRecetas.forEach(e => { 
                if (e.hasOwnProperty("diets") && e.diets.find(c => c.name === action.payload)) {
                    dietsDB.push(e)
                    }
                });
            const filtroDietas = dietsAPI.concat(dietsDB)
            //console.log(filtroDietas)
            return {
                ...state,
                allRecetas: action.payload === "ALL" ? allRecetas : filtroDietas
            };


        case "CREADOS_DB": 
            // const allRecetas2 = state.recetasFiltradas
            // const creadosDB = action.payload === "DB" ? allRecetas2.filter(r => r.creadoDB) : allRecetas2.filter(r => !r.creadoDB)
            // console.log(creadosDB)
            // return {
            //     ...state,
            //     allRecetas: action.payload === "all" ? allRecetas2 : creadosDB
            // };
            const allRecipe2= state.recetasFiltradas
            let filterDb = [];
            let filterApi = [];
            if (action.payload === "created") {
                filterDb = allRecipe2.filter((r) =>
                  r.hasOwnProperty("createDB")
                );
              }
              else if (action.payload === "api") {
                filterApi = allRecipe2.filter((r) => !r.createDB);
              }
              return {
                ...state,
                allRecetas:
                  action.payload === "All"
                    ? allRecipe2
                    : action.payload === "created"
                    ? filterDb
                    : action.payload === "api"
                    ? filterApi
                    : allRecipe2,
                //recipes: action.payload === 'All' ? allRecipes_2 : createdFilter
              };

        case "ORDER_BY_ALFABETO":
            const allRecetas3 = state.allRecetas
            if(action.payload === "AZ" ){
                allRecetas3.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1
                    }
                    return 0
                })
            } else if(action.payload === "ZA"){
                allRecetas3.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1
                    }
                    return 0
                })  
            } 
            return {
                ...state,
                allRecetas: allRecetas3
            };


        case "ORDER_BY_PUNTAJE": 
            const allRecetas4 = state.allRecetas
            if(action.payload === "descendente" ){ 
                allRecetas4.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1
                    }
                    return 0
                })
            } else if(action.payload === "ascendente" ){
                state.allRecetas.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1
                    }
                    return 0
                })
            }    
            return {
                ...state,
                allRecetas: allRecetas4
            };
        
       default: return {...state};
    };
};

export default rootReducer;
