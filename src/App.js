import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import "./App.css";

  const App = () => {

    const APP_ID = "c5da39b4";
    const APP_KEY = "5350b072c90deef413b5f573ed35ed89";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('chicken');

    useEffect( () => {

        getRecipes();

    }, [query]);

    const getRecipes = async () => {
      const response = await fetch ('https://api.edamam.com/search?q=chicken&app_id=c5da39b4&app_key=5350b072c90deef413b5f573ed35ed89&from=0&to=12&calories=591-722&health=alcohol-free');
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };

    const updateSearch = e => {

        setSearch(e.target.value);
    };

    const getSearch = e => {

        e.preventDefault();
        setQuery(search);
    };

    return (
      <div className="App">
        <h1 className= "head11"> React Application </h1>
        <center>
        <form onSubmit={getSearch} className="search-form">
          <input  
                className="search-bar"
                type="text"  
                value={search}
                onChange={updateSearch }/>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        </center>
        <div className="recipes">
            {recipes.map(recipe =>(

              <Recipe 
                      key={recipe.recipe.label}
                      title={recipe.recipe.label}
                      calories={recipe.recipe.calories}
                      source={recipe.recipe.source}
                      image={recipe.recipe.image} 
              />
            ))}
        </div>
      </div>
    );

  };

export default App;
