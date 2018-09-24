// @flow
import * as types from '../actions/types';

const initialState = {
  list: []
};

export default function contracts(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CONTACT_SUCCESS: {
      const { list } = state;
      const index = list.findIndex(el => el.name === action.name);
      if (index === -1) {
        list.push({ name: action.name, title: action.title });
      } else {
        list[index].title = action.title;
      }

      return Object.assign({}, state, {
        list: list.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      });
    }
    case types.REMOVE_CONTACT: {
      const { list } = state;
      const index = list.findIndex(el => el.name === action.name);
      if (index !== -1) {
        return Object.assign({}, state, {
          list: list.splice(index, 1)
        });
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
