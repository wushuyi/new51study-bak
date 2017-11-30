import React, {Component} from 'react';
import withRedux from 'libs/next-redux/next-redux-wrapper';

export default params => (InnerComponent, actions) => {
  class ReduxContainer extends Component {

    static async getInitialProps({store, isServer, ...rest}) {
      let props;
      if (InnerComponent.getInitialProps) {
        props = await InnerComponent.getInitialProps(rest);
      }

      if (isServer) {
        const action = actions.server || actions;
        const rootTask = store.runSagas();
        store.dispatch(Object.assign({}, action, {isServer}, {query: rest.query}));
        store.close();
        await rootTask.done.then(() => store.reset());
      } else {
        const action = actions.client || actions;
        const rootTask = store.runSagas();
        store.dispatch(Object.assign({}, action, {isServer}, {query: rest.query}));
        store.close();
        await rootTask.done.then(() => store.reset());
        store.runSagas();
      }

      return props;
    }


    constructor(props) {
      super(props);
      params.store.runSagas();
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  return withRedux(params.makeStore)(ReduxContainer);
};
