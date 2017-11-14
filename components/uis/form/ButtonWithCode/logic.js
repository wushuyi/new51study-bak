import {kea} from 'libs/kea';
import PropTypes from 'prop-types';
import {put, race, take, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import memoize from 'fast-memoize';

const createLoginc = memoize((key) => kea({
  // key: (props) => props.keakey,
  path: () => ['scenes', 'uis', 'form', 'ButtonWithCode', key || 'index'],
  actions: () => ({
    buttonTimedout: (countdown) => ({countdown}),
    refreshCountdown: () => ({}),
    unlock: () => ({}),
  }),

  reducers: ({actions}) => ({
    countdown: [0, PropTypes.number, {
      [actions.buttonTimedout]: (state, payload) => payload.countdown,
      [actions.refreshCountdown]: (state, payload) => state - 1,
    }],
    lock: [false, PropTypes.bool, {
      [actions.buttonTimedout]: (state, payload) => true,
      [actions.unlock]: (state, payload) => false,
    }]
  }),

  start: function* () {
    let countdown = yield this.get('countdown');
    if (countdown > 0) {
      yield call(this.workers.countdown);
    }
  },

  takeLatest: ({actions, workers}) => ({
    [actions.buttonTimedout]: workers.countdown
  }),

  workers: {
    countdown: function* () {
      const {refreshCountdown, unlock} = this.actions;
      let lock = true;
      while (lock) {
        yield call(delay, 1000);
        yield put(refreshCountdown());
        let countdown = yield this.get('countdown');
        if (countdown === 0) {
          lock = false;
          yield put(unlock());
        }
      }
    }
  }
}));

export default createLoginc;