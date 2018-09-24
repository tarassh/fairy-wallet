// @flow
import * as types from './types';
import eos from './helpers/eos';

export function addContact(name, title) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.ADD_CONTACT_REQUEST
    });
    const { connection } = getState();
    eos(connection)
      .getAccount(name)
      .then(() =>
        dispatch({
          type: types.ADD_CONTACT_SUCCESS,
          name,
          title
        })
      )
      .catch(err => {
        dispatch({ type: types.ADD_CONTACT_FAILURE, err });
      });
  };
}

export function removeContact(name) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.REMOVE_CONTACT,
      name
    });
  };
}

export default {
  addContact,
  removeContact
};
