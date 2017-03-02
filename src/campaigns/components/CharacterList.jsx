import React from 'react';

import { List } from 'shared/components';

const CharacterList = ({ characters }) => (
  <List
    items={characters}
    label="Characters"
  />
);

export default CharacterList;
