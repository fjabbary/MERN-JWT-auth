import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { userId } from '../userId'

function Home() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await Axios.get("http://localhost:3001/recipes")
            setRecipes(response.data)
        }
        fetchRecipes();
    }, [])


    return (
        <div className="recipes">
            <h1 className="recipe-title">Recipes</h1>
            {recipes.map((recipe, recipeIndex) => (
                <div className="recipe" key={recipeIndex}>
                    <div className="d-flex">
                        <h2>{recipe.name}</h2>
                        <p><strong>Cooking Time:</strong> {recipe.cookingTime} (minutes)</p>
                    </div>
                    <p>{recipe.instruction}</p>

                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <img src={recipe.imgUrl} alt={recipe.name} />


                </div>
            ))}

        </div>
    )
}

export default Home