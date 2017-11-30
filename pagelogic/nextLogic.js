import {kea} from "../libs/kea";
import PropTypes from 'prop-types';
import {put, race, take, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {isServer} from 'utils/runEnv'

export default KeaContext => {
  const {kea} = KeaContext;
  return kea({
    path: (key) => ['scenes', 'pages', 'next'],
    actions: () => ({
      noop: () => ({}),
      title: (text) => ({text}),
      initPage: (title) => ({title}),
    }),

    reducers: ({actions}) => ({
      counter: [0, PropTypes.number, {
        [actions.increment]: (state, payload) => state + payload.amount,
        [actions.decrement]: (state, payload) => state - payload.amount
      }],
      title: ['ok', PropTypes.string, {
        [actions.title]: (state, payload) => payload.text
      }]
    }),

    selectors: ({selectors}) => ({
      doubleCounter: [
        () => [selectors.counter],
        (counter) => counter * 2,
        PropTypes.number
      ]
    }),

    start: function* () {
      // yield call(delay, 2000);
      // console.log('start!');
    },

    stop: function* () {

      // yield call(delay, 2000);
      // console.log('stop');

    },

    takeEvery: ({actions, workers}) => ({
      [actions.noop]: workers.noop,
      [actions.initPage]: workers.initPage
    }),

    workers: {
      noop: function* () {
      },
      initPage: function* (action) {

        const {actions} = this;
        const {title} = action.payload;
        yield call(delay, 2000);
        // console.log('initPage!');
        yield put(actions.title(title))
        // console.log(action);
        // if (isServer) {
        //
        // }
      }
    }
  });
}