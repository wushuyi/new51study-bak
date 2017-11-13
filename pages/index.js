import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/index';
import {connect} from 'libs/kea';
import {isBrowser} from 'utils';
import LoginByCode from 'components/pages/loginByCode';

async function getLibs() {
  let libs = {};
  if (isBrowser) {
    try {
      let esMoment = await import('libs/momentzhcn');
      libs.moment = esMoment.default;
    } catch (err) {

    }

  }
  return libs;
}

@connect({
  actions: [
    logic, [
      'increment',
      'decrement',
      'title'
    ]
  ],
  props: [
    logic, [
      'counter',
      'doubleCounter',
      'title',
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
    store.dispatch(logic.actions.increment(2));
    return props;
  }

  getChildContext() {
    let {url} = this.props;
    return {
      url
    };
  }

  async componentDidMount() {
    this.mounted = true;
    let libs = {};
    if (this.props.libs) {
      libs = this.props.libs;
    } else if (this.mounted) {
      libs = await getLibs();
    }
    console.log('componentDidMount', libs);
    window.libs = libs;
  }


  render() {
    let {counter, doubleCounter, title} = this.props;
    let {increment, decrement} = this.actions;
    return (
      <Layout>
        <LoginByCode/>
      </Layout>
    );
  }
}

export default withRedux(Index);
