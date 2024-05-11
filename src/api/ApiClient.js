export const API_URL = 'https://api.recetly.net/api/'

export const ENDPOINTS = {
    LogIn: `v1/auth/login`,
    GetRecipesCards: `v1/recipe/get/all/basic`,
    GetUserData: (id) => `v1/auth/get/${id}`,
    UpdateUser: (id) => `v2/user/update/profile/${id}`,
    GetUserRecipes: (id) => `v1/user/get/recipes/${id}`,
    GetRecipeCard: (id) => `v1/recipe/get/basic/${id}`,
    GetFavorites: (id) => `v1/user/get/all/favorites/${id}`,
    GetRecipe: (id) => `v1/recipe/get/${id}`,
    GetDaily: `v2/recipe/get/daily`,
    GetMexRecipes: `v1/recipe/get/category/1`,
    GetItaRecipes: `v1/recipe/get/category/2`,
    GetPostresRecipes: `v1/recipe/get/category/3`,
    GetOriRecipes: `v1/recipe/get/category/4`,
    GetDrinkRecipes: `v1/recipe/get/category/5`,
    CheckFavorite: (userID, recipeID) => `v1/user/get/check/favorite/${userID}/recipe/${recipeID}`,
    AddFavorite: (userID, recipeID) => `v1/user/post/favorite/${userID}/recipe/${recipeID}`,
    DeleteFavorite: (userID, recipeID) => `v1/user/delete/favorite/${userID}/recipe/${recipeID}`,
    PostComment: (recipeID, userID) => `v1/recipe/post/comment/${recipeID}/${userID}`,
    GetComment: (recipeID) => `v1/recipe/get/comment/${recipeID}`
}
