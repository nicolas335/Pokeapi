import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Pokemon {
  name: string;
  image: string;
  weight: number;
  abilities: string[];
}

interface PokemonContextProps {
  pokemonList: Pokemon[];
  filteredList: Pokemon[];
  searchName: string;
  searchAbilities: string[];
  setSearchName: (name: string) => void;
  setSearchAbilities: (abilities: string[]) => void;
  removePokemon: (name: string) => void;
  allAbilities: string[]; // Agregar la propiedad 'allAbilities' a la interfaz
}

export const PokemonContext = createContext<PokemonContextProps>({
  pokemonList: [],
  filteredList: [],
  searchName: '',
  searchAbilities: [],
  setSearchName: () => {},
  setSearchAbilities: () => {},
  removePokemon: () => {},
  allAbilities: [], // Inicializar la propiedad 'allAbilities' con un arreglo vacío
});

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [searchAbilities, setSearchAbilities] = useState<string[]>([]);
  const [allAbilities, setAllAbilities] = useState<string[]>([]); 

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        const { results } = response.data;
        const pokemons: Pokemon[] = [];

        Promise.all(
          results.map((pokemon: any) =>
            axios.get(pokemon.url).then((response) => {
              const { name, weight, abilities, sprites } = response.data;
              const pokemonData: Pokemon = {
                name,
                image: sprites.front_default,
                weight,
                abilities: abilities.map((ability: any) => ability.ability.name),
              };
              pokemons.push(pokemonData);
            })
          )
        ).then(() => {
          setPokemonList(pokemons);

          // Obtener todas las habilidades
          const abilities = Array.from(
            new Set(pokemons.flatMap((pokemon) => pokemon.abilities))
          );
          setAllAbilities(abilities);
        });
      })
      .catch((error) => {
        console.log('Error fetching Pokémon list:', error);
      });
  }, []);

  useEffect(() => {
    const filteredByName = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchName.toLowerCase())
    );
    const filteredByAbilities = pokemonList.filter((pokemon) =>
      searchAbilities.every((ability) => pokemon.abilities.includes(ability))
    );
    const filteredPokemons = filteredByName.filter((pokemon) => filteredByAbilities.includes(pokemon));
    setFilteredList(filteredPokemons);
  }, [searchName, searchAbilities]);

  const removePokemon = (name: string) => {
    setFilteredList(filteredList.filter((pokemon) => pokemon.name !== name));
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        filteredList,
        searchName,
        searchAbilities,
        setSearchName,
        setSearchAbilities,
        removePokemon,
        allAbilities, 
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

