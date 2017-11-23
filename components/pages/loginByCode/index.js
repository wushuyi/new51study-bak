import {Component} from "react";
import PropTypes from "prop-types";
import style from "./style.scss";
import InputValue from "components/uis/form/InputValue";
import Button from "components/uis/form/Button";
import ButtonWithCode from "components/uis/form/ButtonWithCode";
import Link from "next/link";
import WhiteSpace from 'components/uis/WhiteSpace';

import {px2rem} from "utils";

class LoginByCode extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="login-code-title">免注册进入<span>我要学</span></div>
                <div className="form-wrapper">
                    <InputValue type="phone" className="" placeholder="手机号"/>
                    <ButtonWithCode logicKey='loginbycode' placeholder="验证码"/>
                    <WhiteSpace size="30"/>
                    <Button>进入</Button>
                </div>
                <div className="is-clearfix link-wapper">
                    <Link href="./login-passwd">
                        <a href="./login-passwd" className="is-pulled-right link">密码登录</a>
                    </Link>
                </div>
                <style jsx>{style}</style>
            </div>
        );
    }
}

export default LoginByCode;