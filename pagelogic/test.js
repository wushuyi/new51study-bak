import {kea} from 'libs/kea';
import PropTypes from 'prop-types';
import {take, put, call, fork, race, cancelled} from 'redux-saga/effects';
import {eventChannel, END, delay} from 'redux-saga';


const countdown = (secs) => {
  console.log('countdown', secs);
  return eventChannel(listener => {
      const iv = setInterval(() => {
        secs -= 1;
        console.log('countdown', secs);
        if (secs > 0)
          listener(secs);
        else {
          listener(END);
          clearInterval(iv);
          console.log('countdown terminated');
        }
      }, 1000);
      return () => {
        clearInterval(iv);
        console.log('countdown cancelled');
      };
    }
  );
};


const logic = kea({
  path: (key) => ['scenes', 'pages', 'test'],
  actions: () => ({
    increment: (_) => _,
    decrement: (_) => _,
    increment_if_odd: (_) => _,
    increment_async: (value) => ({value}),
    cancel_increment_async: (_) => _,
    countdown_terminated: (_) => _,
    start: (_) => _,
  }),

  reducers: ({actions}) => ({
    countdown: [0, PropTypes.number, {
      [actions.increment_async]: (state, payload) => payload.value,
      [actions.countdown_terminated]: (state, payload) => 0,
      [actions.cancel_increment_async]: (state, payload) => 0,
    }],
    counter: [0, PropTypes.number, {
      [actions.increment]: (state, payload) => state + 1,
      [actions.decrement]: (state, payload) => state - 1,
      [actions.increment_if_odd]: (state, payload) => state % 2 ? state + 1 : state,
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
    // const {increment} = this.actions;
    // yield put(increment(6))
    // saga started or component mounted
    // console.log(this)
    // console.log('run start2');
  },

  takeEvery: ({actions, workers}) => ({
    [actions.start]: workers.watchIncrementAsync
  }),

  workers: {
    incrementAsync: function* (action) {
      const {increment_async, setFetchError, increment, countdown_terminated} = this.actions;
      const {value} = action.payload;
      const chan = yield call(countdown, value);
      try {
        while (true) {
          let seconds = yield take(chan);
          yield call((seconds) => {
            console.log('seconds', seconds);
          }, seconds);
          yield put(increment_async(seconds));
        }
      } finally {
        if (!(yield cancelled())) {
          yield put(increment());
          yield put(countdown_terminated());
        }
        chan.close();
        console.log('chan.close');
      }
    },
    watchIncrementAsync: function* (action) {
      const {increment} = this.actions;
      const {incrementAsync} = this.workers;
      const {increment_async, cancel_increment_async} = this.actions;
      try {
        while (true) {
          const action = yield take(increment_async);
          // starts a 'Race' between an async increment and a user cancel action
          // if user cancel action wins, the incrementAsync will be cancelled automatically
          yield race([
            call(incrementAsync, action),
            take(cancel_increment_async)
          ]);
        }
      } finally {
        console.log('watchIncrementAsync terminated');
      }
    }
  }
});

export default logic;