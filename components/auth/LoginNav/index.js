import {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import classnames from 'classnames';
import Link from 'next/link';

import {px2rem} from 'utils/index';

export default class LoginNav extends Component {
  static defaultProps = {
    active: 'dl', //'dl'|'zc'
  };

  render() {
    const {active} = this.props;

    let dlClass = classnames('nav nav-dl', {
      'is-active': active === 'dl',
    });

    let zcClass = classnames('nav nav-dl', {
      'is-active': active === 'zc',
    });

    return (
      <div className="wapper">
        <Link href='./login-passwd'>
          <a className={dlClass}>登录</a>
        </Link>
        <Link href='./register'>
          <a className={zcClass}>注册</a>
        </Link>
        <style jsx>{style}</style>
      </div>
    );
  }
}