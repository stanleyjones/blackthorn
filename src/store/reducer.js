import { combineReducers } from 'redux';

import campaigns from '../campaigns';
import user from '../user';

const rootReducer = combineReducers({
  campaigns,
  user,
});

export default rootReducer;
