import {kea} from 'libs/kea';
import PropTypes from 'prop-types';
import {put, race, take, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';

let count = 0;

const logic = kea({
  path: (key) => ['scenes', 'pages', 'index'],
  actions: () => ({
    increment: (amount) => ({amount}),
    decrement: (amount) => ({amount}),
    title: (text) => ({text}),
  }),

  reducers: ({actions}) => ({
    counter: [0, PropTypes.number, {
      [actions.increment]: (state, payload) => state + payload.amount,
      [actions.decrement]: (state, payload) => state - payload.amount
    }],
    title: ['', PropTypes.string, {
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

  // start: function* () {
  //   const {increment} = this.actions;
  //   yield put(increment(6))
  //   // saga started or component mounted
  //   // console.log(this)
  //   console.log('run start2', count++);
  // },

  takeEvery: ({actions, workers}) => ({
    [actions.increment]: workers.noop
  }),

  workers: {
    noop: function* () {
    }
  }
});

export default logic;