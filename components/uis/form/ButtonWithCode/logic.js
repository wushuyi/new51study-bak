import {kea} from 'libs/kea';
import PropTypes from 'prop-types';
import {put, race, take, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
// import a from 'date-fns/for';
import getSeconds from 'date-fns/get_seconds';
import addSeconds from 'date-fns/add_seconds';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import b from 'date-fns/locale/zh_cn';

const createLoginc = (key) => kea({
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
            [actions.unlock]: (state, payload) => 0,
        }],
        lock: [true, PropTypes.bool, {
            [actions.buttonTimedout]: (state, payload) => true,
            [actions.unlock]: (state, payload) => false,
        }]
    }),

    start: function* () {
        console.log('start');
        const {buttonTimedout, unlock} = this.actions;
        let key = this.path.join('.') + 'endDate';
        const localforage = yield import('localforage');
        let end = yield localforage.getItem(key);
        let diffSec;
        diffSec = end && differenceInSeconds(new Date(end), new Date());
        if (diffSec && diffSec > 0) {
            yield put(buttonTimedout(diffSec));
        } else {
            yield put(unlock());
        }
    },

    takeLatest: ({actions, workers}) => ({
        [actions.buttonTimedout]: workers.countdown
    }),

    workers: {
        countdown: function* () {
            let countdown = yield this.get('countdown');
            const end = addSeconds(new Date(), countdown);
            const localforage = yield import('localforage');
            let key = this.path.join('.') + 'endDate';
            yield localforage.setItem(key, end.getTime());

            const {refreshCountdown, unlock} = this.actions;
            let lock = true;
            while (lock) {
                yield call(delay, 1000);
                yield put(refreshCountdown());
                let countdown = yield this.get('countdown');
                if (countdown < 1) {
                    lock = false;
                    yield localforage.removeItem(key);
                    yield put(unlock());
                }
            }
        }
    }
});

export default createLoginc;