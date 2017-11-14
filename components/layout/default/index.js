import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';

class Layout extends React.Component {
  static defaultProps = {
    title: '我要学',
  };

  static propTypes = {
    title:
    PropTypes.string
  };

  componentDidMount() {
    // window.hotcss.init();
    // window.hotcss.mresize();
  }

  render() {
    let {children, title} = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet='utf-8'/>
          <link rel="stylesheet" href="/static/styles/bulma.css"/>
        </Head>
        {children}
        {/*<script>hotcss.mresize();</script>*/}
      </div>
    );
  }
}

export default Layout;