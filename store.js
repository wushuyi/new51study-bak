import {default as baseWithRedux} from "libs/next-redux/next-redux-wrapper";
import withReduxSaga from 'libs/next-redux/next-redux-saga'

export function configureStore(initialState, options) {
  const {KeaContext} = options;
  // console.log(initialState)
  const store = KeaContext.getStore({
    preloadedState: initialState,
  });

  return store;
}


export function withRedux(BaseComponent, createLogic) {
  return baseWithRedux(configureStore)(withReduxSaga(BaseComponent), createLogic);
}