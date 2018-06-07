import React from 'react';

import { List } from '../../shared/components';

const PlayerList = ({ players }) => (
  <List
    items={players}
    label="Players"
    nameAttr="email"
  />
);

export default PlayerList;
