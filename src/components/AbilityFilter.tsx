import React from 'react';

interface AbilityFilterProps {
  allAbilities: string[];
  selectedAbilities: string[];
  handleSelectAbility: (ability: string) => void;
}

const AbilityFilter: React.FC<AbilityFilterProps> = ({
  allAbilities,
  selectedAbilities,
  handleSelectAbility,
}) => {
  return (
    <div>
      <label htmlFor="search-abilities">Search by Abilities:</label>
      <select
        id="search-abilities"
        multiple
        value={selectedAbilities}
        onChange={(e) => handleSelectAbility(e.target.value)}
      >
        {allAbilities.map((ability, index) => (
          <option key={index} value={ability}>
            {ability}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AbilityFilter;
