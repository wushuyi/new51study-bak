import {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import InputText from 'components/uis/form/InputText';
import Button from 'components/uis/form/Button';

class LoginByCode extends Component {


  render() {
    return (
      <div className="wrapper">
        <div className="login-code-title">免注册进入<span>我要学</span></div>
        <div>
          <InputText placeholder="手机号"/>
          <InputText placeholder="验证码"/>
          <Button>进入</Button>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default LoginByCode;