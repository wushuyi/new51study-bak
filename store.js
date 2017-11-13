import {getStore} from 'libs/kea';
import {default as baseWithRedux} from "libs/next-redux/next-redux-wrapper";
import withReduxSaga from 'libs/next-redux/next-redux-saga'

export function configureStore(initialState) {
  const store = getStore({
    preloadedState: initialState,
  });

  return store;
}


export function withRedux(BaseComponent) {
  return baseWithRedux(configureStore)(withReduxSaga(BaseComponent));
}