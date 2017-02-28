import { queryGraph } from '../shared/helpers';

export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN';
export const DELETING_CAMPAIGN = 'DELETING_CAMPAIGN';
export const DELETED_CAMPAIGN = 'DELETED_CAMPAIGN';
export const DELETE_CAMPAIGN_FAILURE = 'DELETE_CAMPAIGN_FAILURE';
export const SAVING_CAMPAIGN = 'SAVING_CAMPAIGN';
export const SAVED_CAMPAIGN = 'SAVED_CAMPAIGN';
export const SAVE_CAMPAIGN_FAILURE = 'SAVE_CAMPAIGN_FAILURE';

const defaultAttrs = {
  name: 'New Campaign',
};

export const editCampaign = (e, id) => {
  const { name, value } = e.target || e;
  return { type: EDIT_CAMPAIGN, attrs: { [name]: value }, id };
};

export const saveCampaign = (userId, attrs) => async (dispatch) => {
  dispatch({ type: SAVING_CAMPAIGN });
  const { id, name } = attrs;
  const redirect = id ? `/campaigns/${id}` : null;
  try {
    const { data } = await queryGraph(`
      mutation {
        campaigns: saveCampaign(input: {
          ${id ? `_id: "${id}"` : ''}
          name: "${name}",
          userId: "${userId}",
        }) { id: _id, name }
      }
    `);
    return dispatch({ type: SAVED_CAMPAIGN, data, redirect });
  } catch (err) {
    return dispatch({ type: SAVE_CAMPAIGN_FAILURE, err });
  }
};

export const deleteCampaign = (userId, id) => async (dispatch) => {
  dispatch({ type: DELETING_CAMPAIGN });
  try {
    const { data } = await queryGraph(`
      mutation {
        campaigns: deleteCampaign(input: {
          _id: "${id}",
          userId: "${userId}",
        }) { id: _id, name }
      }
    `);
    return dispatch({ type: DELETED_CAMPAIGN, data, redirect: '/campaigns' });
  } catch (err) {
    return dispatch({ type: DELETE_CAMPAIGN_FAILURE, err });
  }
};

export const newCampaign = userId => saveCampaign(userId, defaultAttrs);
