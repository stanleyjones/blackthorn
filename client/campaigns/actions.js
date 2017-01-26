import { parseResponse, queryGraph } from '../helpers';

export const SAVING_CAMPAIGN = 'SAVING_CAMPAIGN';
export const SAVED_CAMPAIGN = 'SAVED_CAMPAIGN';

const defaultAttrs = {
  name: 'New Campaign',
};

export const saveCampaign = (userId, attrs) => (dispatch) => {
  dispatch({ type: SAVING_CAMPAIGN });
  const { _id, name } = attrs;
  queryGraph(`mutation {
    campaigns: saveCampaign(input: {
      _id: "${_id || ''}",
      name: "${name}",
      userId: "${userId}",
    }) { id: _id, name }
  }`)
  .then(parseResponse)
  .then(json => dispatch({ type: SAVED_CAMPAIGN, data: json.data }));
};

export const newCampaign = (userId) => saveCampaign(userId, defaultAttrs);
