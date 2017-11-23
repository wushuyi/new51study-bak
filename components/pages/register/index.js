import {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import InputText from 'components/uis/form/InputValue';
import Button from 'components/uis/form/Button';
import ButtonWithCode from 'components/uis/form/ButtonWithCode';
import LoginNav from 'components/auth/LoginNav';
import Link from 'next/link';

import {px2rem} from 'utils';

class LoginByCode extends Component {

  render() {
    return (
      <div className="wrapper">
        <LoginNav active='zc'/>
        <div className="form-wrapper">
          <InputText placeholder="手机号"/>
          <ButtonWithCode logicKey='register' placeholder="验证码"/>
          <InputText type="password" placeholder="密码(请输入6位以上的数字或字母)"/>
          <InputText placeholder="输入邀请码(可不填)"/>
          <Button style={{'marginTop': px2rem(30.0)}}>注册</Button>
        </div>
        <div className="is-clearfix link-wapper">
          <Link href="./login-code">
            <a href="./login-code" className="is-pulled-right link">验证码快捷登录</a>
          </Link>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default LoginByCode;