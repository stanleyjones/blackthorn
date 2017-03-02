import { combineReducers } from 'redux';

import campaigns from '../campaigns';
import characters from '../characters';
import user from '../user';

const rootReducer = combineReducers({
  campaigns,
  characters,
  user,
});

export default rootReducer;
