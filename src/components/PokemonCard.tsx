import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Pokemon } from '../context/PokemonContext';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{pokemon.name}</Typography>
        <img src={pokemon.image} alt={pokemon.name} />
        <Typography>Weight: {pokemon.weight}</Typography>
        <Typography>Abilities: {pokemon.abilities.join(', ')}</Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;

