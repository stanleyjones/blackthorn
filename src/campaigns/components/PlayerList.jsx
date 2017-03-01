import React from 'react';

const PlayerList = ({ players }) =>
  players ? (
    <ul>{ players.map(player => <li key={player.id}>{player.name || player.email}</li>) }</ul>
  ) : null;

export default PlayerList;
