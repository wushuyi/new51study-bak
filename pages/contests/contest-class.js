import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/contestclass';
import {connect} from 'libs/kea';
import {isBrowser} from 'utils';
import LoginByCode from 'components/pages/loginByCode';

@connect({
  actions: [
    logic, [
      // 'increment',
      // 'decrement',
      // 'increment_if_odd',
      // 'increment_async',
      // 'cancel_increment_async',
      // 'start',
    ]
  ],
  props: [
    logic, [
      // 'counter',
      // 'countdown',
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

  static async getInitialProps({isServer, store, req, actions, selectors, query}) {
    let jquery, props = {};
    store.dispatch(logic.actions.Requestframework(31));
    console.log(query);
    return props;
  }

  getChildContext() {
    let {url} = this.props;
    return {
      url
    };
  }

  async componentDidMount() {
    console.log(this.props);
    let {actions} = this.props;
    // actions.start();
  }


  render() {
    let {actions} = this.props;
    let {countdown, counter} = this.props;
    return (
      <Layout>
        <div>
          contest-class
        </div>
      </Layout>
    );
  }
}

export default withRedux(Index);
