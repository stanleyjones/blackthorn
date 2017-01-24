import { combineReducers } from 'redux';

import user from './user';
import campaigns from './campaigns';

const rootReducer = combineReducers({
  user,
  campaigns,
});

export default rootReducer;
