import {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import InputText from 'components/uis/form/InputText';
import Button from 'components/uis/form/Button';
import createButtonWithCode from 'components/uis/form/ButtonWithCode';
import Link from 'next/link';

import {px2rem} from 'utils';

const ButtonWithCode = createButtonWithCode('loginByCode');

class LoginByCode extends Component {

  render() {
    return (
      <div className="wrapper">
        <div className="login-code-title">免注册进入<span>我要学</span></div>
        <div className="form-wrapper">
          <InputText className='' placeholder="手机号"/>
          <ButtonWithCode placeholder="验证码"/>
          <Button style={{'marginTop': px2rem(30.0)}}>进入</Button>
        </div>
        <div className="is-clearfix link-wapper">
          <Link href='./login-passwd'>
            <a href='./login-passwd' className="is-pulled-right link">密码登录</a>
          </Link>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default LoginByCode;