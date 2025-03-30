const express = require("express");
const axios = require("axios");
const { name } = require("ejs");
const app = express();
const port = 3000;

//set EJS as the templating engine
app.set("view engine", "ejs");
// app.set("views", "./views");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=30"
    );
    const pokemonList = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: details.data.sprites.front_default,
          url: `/pokemon/${details.data.id}`,
        };
      })
    );
    res.render("index", { pokemonList });
  } catch (error) {
    res.status(500).send("Error fetching Pokemon data");
  }
});

app.get("/pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    const pokemon = {
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      moves: response.data.moves.slice(0, 5).map((m) => m.move.name),
      description: speciesResponse.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text,
      stats: {
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        special_attack: response.data.stats[3].base_stat,
        special_defense: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
      },
    };
    res.render("pokemon", { pokemon });
  } catch (error) {
    res.status(500).send("Error fetching Pokémon details");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// const postRouter = require("./routes/posts");
// app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
