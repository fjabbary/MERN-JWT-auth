import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Home() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await Axios.get("http://localhost:3001/recipes")
            setRecipes(response.data)
        }
        fetchRecipes();
    })

    return (
        <div className="recipes">
            <h1 className="recipe-title">Recipes</h1>
            {recipes.map((recipe) => (
                <div className="recipe">
                    <h2>{recipe.name}</h2>
                    <p>{recipe.instruction}</p>

                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li>{ingredient}</li>
                        ))}
                    </ul>
                    <img src={recipe.imgUrl} alt={recipe.name} />

                    <p><b>Cooking Time:</b> {recipe.cookingTime} (minutes)</p>
                </div>
            ))}

        </div>
    )
}

export default Home