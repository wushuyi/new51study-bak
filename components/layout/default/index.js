import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';

class Layout extends React.Component {
  static defaultProps = {
    title: 'title',
  };

  static propTypes = {
    title:
    PropTypes.string
  };

  render() {
    let {children, title} = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <script src="/static/hotcss/hotcss414.js"></script>
          <link rel="stylesheet" href="/static/styles/bulma.css"/>
        </Head>
        {children}
        <script>hotcss.mresize();</script>
      </div>
    );
  }
}

export default Layout;