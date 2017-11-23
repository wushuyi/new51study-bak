import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/test';
import {connect} from 'libs/kea';
import {isBrowser} from 'utils';
import LoginByCode from 'components/pages/loginByCode';

@connect({
  actions: [
    logic, [
      'increment',
      'decrement',
      'increment_if_odd',
      'increment_async',
      'cancel_increment_async',
      'start',
    ]
  ],
  props: [
    logic, [
      'counter',
      'countdown',
    ]
  ]
})
class Index extends React.Component {
  static childContextTypes = {
    url: PropTypes.any
  };

  constructor() {
    super();
    this.libs = {};
  }

  static async getInitialProps({isServer, store, req, actions, selectors}) {
    let jquery, props = {};
    // store.dispatch(logic.actions.start());
    return props;
  }

  getChildContext() {
    let {url} = this.props;
    return {
      url
    };
  }

  async componentDidMount() {
    let {actions} = this.props;
    actions.start();
  }


  render() {
    let {actions} = this.props;
    let {countdown, counter} = this.props;
    return (
      <Layout>
        <div>
          Clicked: {counter} times
          {' '}
          <button onClick={() => actions.increment()}>+</button>
          {' '}
          <button onClick={() => actions.decrement()}>-</button>
          {' '}
          <button onClick={() => actions.increment_if_odd()}>Increment if odd</button>
          {' '}
          <button
            onClick={countdown ? () => actions.cancel_increment_async() : () => actions.increment_async(5)}
            style={{color: countdown ? 'red' : 'black'}}>

            {countdown ? `Cancel increment (${countdown})` : 'increment after 5s'}
          </button>
          <button onClick={() => actions.start()}>start</button>
        </div>
      </Layout>
    );
  }
}

export default withRedux(Index);
