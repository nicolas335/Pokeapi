import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from './PokemonCard';

const PokemonList: React.FC = () => {
  const { filteredList } = useContext(PokemonContext);

  return (
    <Grid container spacing={2}>
      {filteredList.map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;








