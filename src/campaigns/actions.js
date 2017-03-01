import { queryGraph } from '../shared/helpers';

export const EDIT = 'CAMPAIGN.EDIT';
export const DELETE = 'CAMPAIGN.DELETE';
export const DELETE_SUCCESS = 'CAMPAIGN.DELETE.SUCCESS';
export const DELETE_FAILURE = 'CAMPAIGN.DELETE.FAILURE';
export const SAVE = 'CAMPAIGN.SAVE';
export const SAVE_SUCCESS = 'CAMPAIGN.SAVE.SUCCESS';
export const SAVE_FAILURE = 'CAMPAIGN.SAVE.FAILURE';

const defaultAttrs = {
  name: 'New Campaign',
};

export const editCampaign = (e, id) => {
  const { name, value } = e.target || e;
  return { type: EDIT, attrs: { [name]: value }, id };
};

export const saveCampaign = (userId, attrs) => async (dispatch) => {
  dispatch({ type: SAVE });
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
    return dispatch({ type: SAVE_SUCCESS, data, redirect });
  } catch (err) {
    return dispatch({ type: SAVE_FAILURE, err });
  }
};

export const deleteCampaign = (userId, id) => async (dispatch) => {
  dispatch({ type: DELETE });
  try {
    const { data } = await queryGraph(`
      mutation {
        campaigns: deleteCampaign(input: {
          _id: "${id}",
          userId: "${userId}",
        }) { id: _id, name }
      }
    `);
    return dispatch({ type: DELETE_SUCCESS, data, redirect: '/campaigns' });
  } catch (err) {
    return dispatch({ type: DELETE_FAILURE, err });
  }
};

export const newCampaign = userId => saveCampaign(userId, defaultAttrs);
