import {call, take, cancel, spawn, fork, all} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

let emitter;
let cancelCounter = 1;
let toCancel = {};
let isBrowser = typeof window !== 'undefined';

function createComponentChannel(socket) {
  return eventChannel(emit => {
    emitter = emit;
    return () => {
    };
  });
}

function* manSaga() {
  const channel = yield call(createComponentChannel);
  let lock = true;
  while (lock) {
    const {startSaga, cancelSaga, saga, counter} = yield take(channel);
    if (startSaga) {
      toCancel[counter] = yield fork(saga);
    }
    if (cancelSaga) {
      yield cancel(toCancel[counter]);
    }
    if (!isBrowser) {
      lock = false;
    }
  }
}

export function* keaSaga() {
  yield fork(manSaga);
}

export function startSaga(saga) {
  if (emitter) {
    cancelCounter += 1;
    emitter({startSaga: true, saga, counter: cancelCounter});
    return cancelCounter;
  }

  return null;
}

export function cancelSaga(counter) {
  if (emitter) {
    emitter({cancelSaga: true, counter});
  }
}
