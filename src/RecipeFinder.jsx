import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${query}&number=5`;

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() !== "") {
      fetchRecipes();
    }
  }, [query]);

  return (
    <div className="display">
    <div className="header">
      <h1
        className="text-center"
        style={{ width: "100%", fontStyle: "oblique" }}
      >
        Recipe Finder
      </h1>
      </div>
      <div className="d-flex justify-content-center">
        <input
          style={{ width: "400px" }}
          className="form-control"
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ingredients"
        />
      </div>
      <div className="d-flex justify-content-center my-3">
        {loading && <Spinner/>}
      </div>
      <div className="d-flex justify-content-center my-2">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card text-bg-info my-3 mx-3"
            style={{ width: "800px" }}
          >
            <div className="card-body">
              <div className="card-header text-bg-primary">{recipe.title}</div>
              <h5 className="card-title">
                {recipe.usedIngredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")}
              </h5>
              <p className="card-text">
                {recipe.missedIngredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default RecipeFinder;
