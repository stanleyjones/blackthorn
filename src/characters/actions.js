import { queryGraph } from '../shared/helpers';

export const EDIT = 'CHARACTER.EDIT';
export const CREATE = 'CHARACTER.CREATE';
export const CREATE_SUCCESS = 'CHARACTER.CREATE.SUCCESS';
export const CREATE_FAILURE = 'CHARACTER.CREATE.FAILURE';
export const DELETE = 'CHARACTER.DELETE';
export const DELETE_SUCCESS = 'CHARACTER.DELETE.SUCCESS';
export const DELETE_FAILURE = 'CHARACTER.DELETE.FAILURE';
export const SAVE = 'CHARACTER.SAVE';
export const SAVE_SUCCESS = 'CHARACTER.SAVE.SUCCESS';
export const SAVE_FAILURE = 'CHARACTER.SAVE.FAILURE';

export const editCharacter = (e, id) => {
  const { name, value } = e.target || e;
  return { type: EDIT, attrs: { [name]: value }, id };
};

export const createCharacter = (campaignId, userId) => async (dispatch) => {
  dispatch({ type: CREATE });
  try {
    const { data } = await queryGraph(`
      mutation {
        character: createCharacter(
          campaignId: "${campaignId}",
          userId: "${userId}"
        ) { id, name }
      }
    `);
    return dispatch({ type: CREATE_SUCCESS, data });
  } catch (err) {
    return dispatch({ type: CREATE_FAILURE, err });
  }
};

export const saveCharacter = attrs => async (dispatch) => {
  dispatch({ type: SAVE });
  const { id, name, description } = attrs;
  try {
    const { data } = await queryGraph(`
      mutation {
        characters: saveCharacter(
          characterId: "${id}",
          attrs: { name: "${name}", description: "${description}" }
        ) { id, name }
      }
    `);
    return dispatch({ type: SAVE_SUCCESS, data, redirect: `/characters/${id}` });
  } catch (err) {
    return dispatch({ type: SAVE_FAILURE, err });
  }
};

export const deleteCharacter = (characterId, campaignId) => async (dispatch) => {
  dispatch({ type: DELETE });
  try {
    const { data } = await queryGraph(`
      mutation {
        deleteCharacter(characterId: "${characterId}")
      }
    `);
    return dispatch({ type: DELETE_SUCCESS, data, redirect: `/campaigns/${campaignId}` });
  } catch (err) {
    return dispatch({ type: DELETE_FAILURE, err });
  }
};
