import {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import InputText from 'components/uis/form/InputText';
import Button from 'components/uis/form/Button';
import createButtonWithCode from 'components/uis/form/ButtonWithCode';
import LoginNav from 'components/auth/LoginNav';
import Link from 'next/link';

import {px2rem} from 'utils';

const ButtonWithCode = createButtonWithCode('loginByCode');

class LoginByCode extends Component {

  render() {
    return (
      <div className="wrapper">
        <LoginNav active='dl'/>
        <div className="form-wrapper">
          <InputText placeholder="手机号"/>
          <InputText type="password" placeholder="密码"/>
          <Button style={{'marginTop': px2rem(30.0)}}>登录</Button>
        </div>
        <div className="is-clearfix link-wapper">
          <Link href="./passwd-forget">
            <a href="./passwd-forget" className="is-pulled-left link">忘记密码?</a>
          </Link>
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