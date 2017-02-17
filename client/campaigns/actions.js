import { parseResponse, queryGraph } from '../helpers';

export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN';
export const DELETING_CAMPAIGN = 'DELETING_CAMPAIGN';
export const DELETED_CAMPAIGN = 'DELETED_CAMPAIGN';
export const SAVING_CAMPAIGN = 'SAVING_CAMPAIGN';
export const SAVED_CAMPAIGN = 'SAVED_CAMPAIGN';

const defaultAttrs = {
  name: 'New Campaign',
};

export const editCampaign = (e, id) => {
  const { name, value } = e.target || e;
  return { type: EDIT_CAMPAIGN, attrs: { [name]: value }, id };
};

export const saveCampaign = (userId, attrs) => (dispatch) => {
  dispatch({ type: SAVING_CAMPAIGN });
  const { id, name } = attrs;
  const redirect = id ? `/campaigns/${id}` : null;
  queryGraph(`mutation {
    campaigns: saveCampaign(input: {
      ${id ? `_id: "${id}"` : ''}
      name: "${name}",
      userId: "${userId}",
    }) { id: _id, name }
  }`)
  .then(parseResponse)
  .then(json => dispatch({ type: SAVED_CAMPAIGN, data: json.data, redirect }));
};

export const deleteCampaign = (userId, id) => (dispatch) => {
  dispatch({ type: DELETING_CAMPAIGN });
  queryGraph(`mutation {
    campaigns: deleteCampaign(input: {
      _id: "${id}",
      userId: "${userId}",
    }) { id: _id, name }
  }`)
  .then(parseResponse)
  .then(json => dispatch({ type: DELETED_CAMPAIGN, data: json.data, redirect: '/campaigns' }));
};

export const newCampaign = (userId) => saveCampaign(userId, defaultAttrs);
