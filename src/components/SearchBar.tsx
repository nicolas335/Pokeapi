import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';
import { PokemonContext } from '../context/PokemonContext';

const SearchBar: React.FC = () => {
  const { searchName, setSearchName } = useContext(PokemonContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      label="Search by name"
      placeholder="Enter Pokémon name"
      value={searchName}
      onChange={handleNameChange}
    />
  );
};

export default SearchBar;
