import React, { useState } from 'react';
import Axios from 'axios';
import { userId } from '../userId';

function CreateRecipe() {

    const [count, setCount] = useState(1)
    const [name, setName] = useState("")
    const [ingredients, setIngredient] = useState([""])
    const [instruction, setInstruction] = useState("");
    const [imgUrl, setImgUrl] = useState("")
    const [cookingTime, setCookingTime] = useState(0)

    const increment = () => {
        (count <= 10) && setCount(count + 1)
        setIngredient([...ingredients, ""])
    }

    const handleIngredient = (e, idx) => {
        const ingArr = Array.from(ingredients)
        ingArr.map((_, index) => {
            if (index === idx) {
                ingArr.splice(index, 1, e.target.value)
            }
            return ingArr
        })
        setIngredient(ingArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respsone = await Axios.post("http://localhost:3001/recipes", { name, ingredients, instruction, imgUrl, cookingTime, userOwner: userId })

        console.log(respsone);

        setName("")
        setCount(1)
        setIngredient([""])
        setInstruction("")
        setImgUrl("")
        setCookingTime(0)
    }

    return (
        <div className="create-recipe">
            <h1>CreateRecipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label><br />
                    <input type="text" name="name" placeholder="Recipe name" id="name" onChange={e => setName(e.target.value)} value={name} />
                </div>
                <div className="form-group pos">
                    <label htmlFor="name">Ingredients: </label> <br />
                    {
                        Array.from(Array(count).keys()).map((_, idx) => <input key={idx} type="text" value={ingredients[idx]} onChange={(e) => handleIngredient(e, idx)} style={{ marginBottom: '10px' }} />)
                    }
                    <span className="add-ingredient" onClick={increment}>+</span>
                </div>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label><br />
                    <textarea name="instructions" cols="30" rows="10" value={instruction} onChange={e => setInstruction(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="imagURL">Image URL:</label><br />
                    <input type="text" name="imagURL" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="cooking-time">Cooking time (minutes):</label><br />
                    <input type="number" name="cookingTime" value={cookingTime} onChange={e => setCookingTime(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Create Recipe</button>
            </form>
        </div>
    )
}

export default CreateRecipe