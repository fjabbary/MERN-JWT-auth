import express from 'express';
import { RecipeModel } from '../models/recipes.js';
const router = express.Router();


router.get("/", async (req, res) => {
    const response = await RecipeModel.find({});
    console.log(response);
    res.send(response)
})

router.post("/", async (req, res) => {
    console.log(req.body);
    const newRecipe = new RecipeModel(req.body);
    await newRecipe.save();
    res.send(newRecipe);
})

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);

        await user.save();
        res.json({ saveRecipes: user.savedRecipes })

    } catch (error) {
        res.json(err)
    }
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