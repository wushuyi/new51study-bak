import {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import InputText from 'components/uis/form/InputValue';
import Button from 'components/uis/form/Button';
import ButtonWithCode from 'components/uis/form/ButtonWithCode';
import Link from 'next/link';

import {px2rem} from 'utils';

class LoginByCode extends Component {

  render() {
    return (
      <div className="wrapper">
        <div className="login-code-title">忘记密码</div>
        <div className="form-wrapper">
          <InputText className='' placeholder="手机号"/>
          <ButtonWithCode logicKey='passwdforget' placeholder="验证码"/>
          <InputText type="password" placeholder="密码(请输入6位以上的数字或字母)"/>
          <InputText type="password" placeholder="确认密码"/>
          <Button style={{'marginTop': px2rem(30.0)}}>完成</Button>
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