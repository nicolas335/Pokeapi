import React from 'react';
import { Card, CardContent, Typography, IconButton, CardMedia, Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface PokemonCardProps {
  name: string;
  image: string;
  weight: number;
  abilities: string[];
  onRemove: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, weight, abilities, onRemove }) => {
  return (
    <Card sx={{ display: 'flex', height:'90%' }}>
      <CardMedia component="img"  width="150" height={150} image={image} alt={name} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Divider />
        <Typography>Weight: {weight}</Typography>
        <Typography>Abilities: {abilities.join(', ')}</Typography>
        <IconButton sx={{color: '#ba000d'}}  onClick={onRemove} >
          <ClearIcon sx={{fontSize:25}} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;

