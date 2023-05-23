import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Typography, Grid, CircularProgress } from '@mui/material';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from './PokemonCard';
import axios from 'axios';

interface Pokemon {
  name: string;
  image: string;
  weight: number;
  abilities: string[];
}

const PokemonList: React.FC = () => {
  const { searchName, searchAbilities, setSearchName, setSearchAbilities } = useContext(PokemonContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const { results } = response.data;
        const pokemonList = await Promise.all(
          results.map(async (result: any) => {
            const pokemonResponse = await axios.get(result.url);
            const { name, sprites, weight, abilities } = pokemonResponse.data;
            return {
              name,
              image: sprites.front_default,
              weight,
              abilities: abilities.map((ability: any) => ability.ability.name),
            } as Pokemon;
          })
        );
        setPokemonData(pokemonList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredByName = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const filteredByAbilities = searchAbilities.length
    ? filteredByName.filter((pokemon) =>
        searchAbilities.some((ability) =>
          pokemon.abilities.some((pokemonAbility) =>
            pokemonAbility.toLowerCase().includes(ability.toLowerCase())
          )
        )
      )
    : filteredByName;

  const removePokemon = (name: string) => {
    setPokemonData((prevPokemonData) =>
      prevPokemonData.filter((pokemon) => pokemon.name !== name)
    );
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4">Pokémon List</Typography>

      <TextField
        label="Search by name"
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />

      <TextField
        label="Search by abilities"
        value={searchAbilities.join(',')}
        onChange={(event) => setSearchAbilities(event.target.value.split(','))}
      />

      <Grid container spacing={2}>
        {filteredByAbilities.map((pokemon) => (
          <Grid item key={pokemon.name} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard
              name={pokemon.name}
              image={pokemon.image}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
              onRemove={() => removePokemon(pokemon.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PokemonList;



