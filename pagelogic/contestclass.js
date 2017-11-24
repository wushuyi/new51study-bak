import {kea} from 'libs/kea';
import PropTypes from 'prop-types';
import {put, race, take, call, all, fork} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import request from 'superagent';
import reduce from 'lodash/reduce';

export const service = 'http://192.168.1.249:7080/API';
export const evaluatesFrameworkShare = (evaluate_id) => `/evaluates/${evaluate_id}/framework/forShare`;
export const evaluatesOneShare = (evaluate_id) => `/evaluates/${evaluate_id}/info/one/forShare`;
export const evaluatesTwoShare = (evaluate_id) => `/evaluates/${evaluate_id}/info/two/forShare`;


export const getQueryConfig = {
  'version': "1.0.0",
  "platform": "H5"
};

export function createUrl(api) {
  //?version=1.0.0&platform=H5
  return `${service}${api}`;
}


const logic = kea({
  path: () => ['scenes', 'pages', 'contest-class'],
  actions: () => {
    return {
      initContestClass: (id) => ({id}),
      Requestframework: (id) => ({id}),
      Successframework: (id, res) => ({id: id, res: res}),
      Failureframework: (id, res) => ({id: id, res: res}),

      Requestone: (id, res) => ({id: id, res: res}),
      Successone: (id, res) => ({id: id, res: res}),
      Failureone: (id, res) => ({id: id, res: res}),

      Requesttwo: (id, res) => ({id: id, res: res}),
      Successtwo: (id, res) => ({id: id, res: res}),
      Failuretwo: (id, res) => ({id: id, res: res})
    };
  },

  reducers: ({actions}) => ({
    fetching: [true, PropTypes.bool, {
      [actions.Requestframework]: (state, payload) => true,
      [actions.Successframework]: (state, payload) => false,
      [actions.Failureframework]: (state, payload) => false,
    }],
    framework: [{}, PropTypes.any, {
      [actions.Successframework]: (state, payload) => {
        let {id, res} = payload;
        state[id] = res;
        return state;
      }
    }],
    one: [{}, PropTypes.any, {
      [actions.Successone]: (state, payload) => {
        let {id, res} = payload;
        state[id] = res;
        return state;
      }
    }],
    two: [{}, PropTypes.any, {
      [actions.Successtwo]: (state, payload) => {
        let {id, res} = payload;
        state[id] = res;
        return state;
      }
    }],
  }),

  // selectors: ({selectors}) => ({
  //   doubleCounter: [
  //     () => [selectors.counter],
  //     (counter) => counter * 2,
  //     PropTypes.number
  //   ]
  // }),

  start: function* () {
    // yield call(delay, 6000);
    // console.log('ok');
  },

  takeEvery: ({actions, workers}) => ({
    [actions.noop]: workers.noop,
    [actions.initContestClass]: workers.initContestClass,
    [actions.Requestframework]: workers.getFramework,
    [actions.Requestone]: workers.getOne,
    [actions.Requesttwo]: workers.getTwo,
  }),

  workers: {
    noop: function* () {
    },
    initContestClass: function* (action) {
      let {actions, workers} = this;
      yield all([
        call(workers.getFramework, action),
        call(workers.getOne, action),
        call(workers.getTwo, action)
      ]);
      yield call(console.log, 'all ok!');
    },
    getFramework: function* (action) {

      let {id} = action.payload;
      let {actions} = this;
      yield call(delay, 2000);
      let requestURL = createUrl(evaluatesFrameworkShare(id));
      try {
        let res = yield call(() => {
          return request.get(requestURL)
            .query(getQueryConfig);
        });
        if (res.status === 200) {
          switch (res.body.code) {
            case 200:
              yield put(actions.Successframework(id, res.body.data));
              break;
            case 1444:
              console.log('need auth!');
              break;
            default:
              console.log('未知错误!');
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        // console.log('ok');
      }
      yield call(console.log, 'getFramework');
    },
    getOne: function* (action) {
      let {id} = action.payload;
      let {actions} = this;
      yield call(delay, 1000);
      let requestURL = createUrl(evaluatesOneShare(id));
      try {
        let res = yield call(() => {
          return request.get(requestURL)
            .query(getQueryConfig);
        });
        if (res.status === 200) {
          switch (res.body.code) {
            case 200:
              yield put(actions.Successone(id, res.body.data));
              break;
            case 1444:
              console.log('need auth!');
              break;
            default:
              console.log('未知错误!');
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        // console.log('ok');
      }
      yield call(console.log, 'getOne');
    },
    getTwo: function* (action) {
      let {id} = action.payload;
      let {actions} = this;
      yield call(delay, 2000);
      let requestURL = createUrl(evaluatesTwoShare(id));
      try {
        let res = yield call(() => {
          return request.get(requestURL)
            .query(getQueryConfig);
        });
        if (res.status === 200) {
          switch (res.body.code) {
            case 200:
              yield put(actions.Successtwo(id, res.body.data));
              break;
            case 1444:
              console.log('need auth!');
              break;
            default:
              console.log('未知错误!');
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        // console.log('ok');
      }
      yield call(console.log, 'getTwo');
    },
  }
});

export default logic;