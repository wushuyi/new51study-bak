import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/contestclass';
import {connect} from 'libs/kea';
import {isBrowser} from 'utils';

// import LoginByCode from 'components/pages/loginByCode';

@connect({
  actions: [
    logic, [
      'initContestClass',
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

  static async getInitialProps(ctx) {
    const {err, req, res, pathname, query, asPath, isServer, store} = ctx;
    if (isServer) {
      // res.cookie('test', 'hello');
      // console.log(req.cookies);
    }
    let jquery, props = {};
    store.dispatch(logic.actions.initContestClass(31));
    // await store.sagaTask.done;
    return props;
  }

  getChildContext() {
    let {url} = this.props;
    return {
      url
    };
  }

  async componentDidMount() {
    // console.log(this.props);
    let {actions} = this.props;
    // await actions.initContestClass(31);
    // console.log(actions);
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
