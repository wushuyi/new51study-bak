import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout/default';
import {withRedux} from 'store';
import logic from 'pagelogic/noop';
import {connect} from 'libs/kea';
import {isBrowser} from 'utils';


@connect({
    actions: [
        logic, []
    ],
    props: [
        logic, []
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
        console.log('Cookies: ', req.cookies)
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
                <div></div>
            </Layout>
        );
    }
}

export default withRedux(Index);
