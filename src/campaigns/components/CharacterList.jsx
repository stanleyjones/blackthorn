import React from 'react';
import { Link } from 'react-router';

const CharacterList = ({ characters }) =>
  characters ? (
    <ul>{ characters.map(character => (
      <li key={character.id}>
        <Link to={`/characters/${character.id}`}>{character.name}</Link>
      </li>
    )) }</ul>
  ) : null;

export default CharacterList;
