import express from 'express';
import { RecipeModel } from '../models/recipes.js';
import { UserModel } from '../models/users.js';
const router = express.Router();


router.get("/", async (req, res) => {
    const response = await RecipeModel.find({});
    res.send(response)
})

router.post("/", async (req, res) => {
    const newRecipe = new RecipeModel(req.body);
    await newRecipe.save();
    res.send(newRecipe);
})

router.put("/", async (req, res) => {

    const recipe = await RecipeModel.findById(req.body.recipeId)
    const user = await UserModel.findById(req.body.userId)
    user.savedRecipes.push(recipe);

    console.log(recipe);
    console.log(user);

    await user.save();
    res.json({ saveRecipes: user.savedRecipes })

})

router.get("/savedRecipes/ids", async (req, res) => {
    const user = await UserModel.findById(req.body.userID)
    res.json({ savedRecipes: user?.savedRecipes })
})

router.get("/savedRecipes", async (req, res) => {
    const user = await UserModel.findById(req.body.userID)
    const savedRecipes = await RecipeModel.find({
        _id: { $in: user.savedRecipes }
    })

    res.json({ savedRecipes })
})



export { router as RecipeRouter };