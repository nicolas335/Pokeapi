import axios from 'axios';

export const fetchPokemonList = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return response.data.results;
  } catch (error) {
    console.log('Error fetching Pokémon list:', error);
    return [];
  }
};

export const fetchPokemonData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Error fetching Pokémon data:', error);
    return null;
  }
};

  
