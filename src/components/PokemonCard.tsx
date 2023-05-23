import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface PokemonCardProps {
  name: string;
  image: string;
  weight: number;
  abilities: string[];
  onRemove: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, weight, abilities, onRemove }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <img src={image} alt={name} />
        <Typography>Weight: {weight}</Typography>
        <Typography>Abilities: {abilities.join(', ')}</Typography>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;

