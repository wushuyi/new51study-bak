import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/noop';
import {connect} from 'libs/kea';
import {isBrowser} from 'utils';
import LoginByCode from 'components/pages/loginByCode';

@connect({
  actions: [
    logic, []
  ],
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
    // store.dispatch(logic.actions.increment(2));
    return props;
  }

  getChildContext() {
    let {url} = this.props;
    return {
      url
    };
  }

  async componentDidMount() {

  }


  render() {

    return (
      <Layout>
        <LoginByCode/>
      </Layout>
    );
  }
}

export default withRedux(Index);
