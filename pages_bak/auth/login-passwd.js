import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/noop';
import {connect} from 'libs/kea';
import {isBrowser, sleep} from 'utils';
import LoginByPasswd from 'components/pages/loginByPasswd';

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
        <LoginByPasswd/>
      </Layout>
    );
  }
}

export default withRedux(Index);
