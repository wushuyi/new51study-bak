import React from 'react';
import style from './style.scss';
import Button from 'components/uis/form/Button';
import InputValue from 'components/uis/form/InputValue';
import createLogic from './logic';
import {isBrowser} from 'utils';
import memoize from 'fast-memoize';

const createComponent = memoize((key) => {

    let ButtonWithCode = class ButtonWithCode extends React.Component {
        static defaultProps = {
            buttonText: '获取验证码',
            timedoutTextTmpl: (countdown) => `重发(${countdown}s)`,
            onGetCode: (evt) => true,
            lock: true,
        };

        render() {
            const {
                buttonText,
                timedoutTextTmpl,
                onGetCode,

                countdown,
                lock,
                dispatch,
                actions,
                root,

                onChange,
                onBlur,
                className,
                children,

                ...rest
            } = this.props;
            const codeBtnText = countdown ? timedoutTextTmpl(countdown) : buttonText;

            const inputProp = {onChange, onBlur, ...rest};


            return (
                <div className="wapper">
                    <InputValue type='digit' maxLength={6} {...inputProp}/>
                    <Button
                        className="with-code"
                        disabled={lock}
                        onClick={(evt) => {
                            onGetCode(evt) && !lock && actions.buttonTimedout(5);
                        }}
                    >{codeBtnText}</Button>
                    <style jsx>{style}</style>
                </div>
            );
        }
    };

    if (isBrowser) {
        let logic = createLogic(key);
        ButtonWithCode = logic(ButtonWithCode);
    }
    return ButtonWithCode;
});

export default class ButtonWithCode extends React.Component {

    static defaultProps = {
        logicKey: 'defaultKey',
    };

    render() {
        let {logicKey, ...restProps} = this.props;
        const Component = createComponent(logicKey);
        return (
            <Component {...restProps}/>
        );
    }
}


