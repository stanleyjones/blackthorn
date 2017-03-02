import { queryGraph } from '../shared/helpers';

export const EDIT = 'CAMPAIGN.EDIT';
export const CREATE = 'CAMPAIGN.CREATE';
export const CREATE_SUCCESS = 'CAMPAIGN.CREATE.SUCCESS';
export const CREATE_FAILURE = 'CAMPAIGN.CREATE.FAILURE';
export const DELETE = 'CAMPAIGN.DELETE';
export const DELETE_SUCCESS = 'CAMPAIGN.DELETE.SUCCESS';
export const DELETE_FAILURE = 'CAMPAIGN.DELETE.FAILURE';
export const SAVE = 'CAMPAIGN.SAVE';
export const SAVE_SUCCESS = 'CAMPAIGN.SAVE.SUCCESS';
export const SAVE_FAILURE = 'CAMPAIGN.SAVE.FAILURE';

export const editCampaign = (e, id) => {
  const { name, value } = e.target || e;
  return { type: EDIT, attrs: { [name]: value }, id };
};

export const createCampaign = userId => async (dispatch) => {
  dispatch({ type: CREATE });
  try {
    const { data } = await queryGraph(`
      mutation {
        campaigns: createCampaign(userId: "${userId}") { id: _id, name }
      }
    `);
    return dispatch({ type: CREATE_SUCCESS, data });
  } catch (err) {
    return dispatch({ type: CREATE_FAILURE, err });
  }
};

export const saveCampaign = attrs => async (dispatch) => {
  dispatch({ type: SAVE });
  const { id, name } = attrs;
  try {
    const { data } = await queryGraph(`
      mutation {
        campaigns: saveCampaign(
          campaignId: "${id}",
          attrs: { name: "${name}" }
        ) { id: _id, name }
      }
    `);
    return dispatch({ type: SAVE_SUCCESS, data, redirect: `/campaigns/${id}` });
  } catch (err) {
    return dispatch({ type: SAVE_FAILURE, err });
  }
};

export const deleteCampaign = campaignId => async (dispatch) => {
  dispatch({ type: DELETE });
  try {
    const { data } = await queryGraph(`
      mutation {
        campaigns: deleteCampaign(campaignId: "${campaignId}") { id: _id, name }
      }
    `);
    return dispatch({ type: DELETE_SUCCESS, data, redirect: '/campaigns' });
  } catch (err) {
    return dispatch({ type: DELETE_FAILURE, err });
  }
};
