import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';

export const INIT_COMPLETE = 'INIT_COMPLETE';

export const initAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: INIT_COMPLETE,
        payload: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        }
      });
    } else {
      dispatch({
        type: INIT_COMPLETE,
        payload: null
      });
    }
  });
};

const reducer = (state = { user: null, initializing: true }, action) => {
  switch (action.type) {
    case INIT_COMPLETE:
      return {
        ...state,
        user: action.payload,
        initializing: false
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk));
